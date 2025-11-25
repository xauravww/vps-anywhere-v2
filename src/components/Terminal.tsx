'use client';

import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import '@xterm/xterm/css/xterm.css';

export default function Terminal() {
    const terminalRef = useRef<HTMLDivElement>(null);
    const initializedRef = useRef(false);

    useEffect(() => {
        if (initializedRef.current || !terminalRef.current) return;
        initializedRef.current = true;

        const initTerminal = async () => {
            const { Terminal: XTerm } = await import('@xterm/xterm');
            const { FitAddon } = await import('@xterm/addon-fit');

            const term = new XTerm({
                cursorBlink: true,
                theme: {
                    background: '#000000',
                    foreground: '#ffffff',
                    cursor: '#ffffff',
                    selectionBackground: 'rgba(255, 255, 255, 0.3)',
                },
                fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                fontSize: 14,
            });

            const fitAddon = new FitAddon();
            term.loadAddon(fitAddon);

            term.open(terminalRef.current!);
            fitAddon.fit();

            const socket = io();

            socket.on('connect', () => {
                term.write('\r\n\x1b[1;32mConnected to VPS Anywhere\x1b[0m\r\n\r\n');
            });

            socket.on('terminal:output', (data) => {
                term.write(data);
            });

            term.onData((data) => {
                socket.emit('terminal:input', data);
            });

            const handleResize = () => {
                fitAddon.fit();
                socket.emit('terminal:resize', { cols: term.cols, rows: term.rows });
            };

            window.addEventListener('resize', handleResize);

            // Initial resize
            setTimeout(() => {
                handleResize();
            }, 100);

            return () => {
                socket.disconnect();
                term.dispose();
                window.removeEventListener('resize', handleResize);
            };
        };

        initTerminal();
    }, []);

    return (
        <div className="w-full h-full bg-black p-4 overflow-hidden">
            <div ref={terminalRef} className="w-full h-full" />
        </div>
    );
}
