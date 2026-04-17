import { toCanvas } from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { toPng } from 'html-to-image';

export default function QRCodeSection({ productUrl, productName }) {
    const canvasRef = useRef(null);
    const qrRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current && productUrl) {
            toCanvas(canvasRef.current, productUrl, {
                width: 200,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                },
                errorCorrectionLevel: 'H'
            });
        }
    }, [productUrl]);

    const downloadQR = async () => {
        if (qrRef.current) {
            const dataUrl = await toPng(qrRef.current);
            const link = document.createElement('a');
            link.download = `QR-${productName.replace(/[^a-zA-Z0-9]/g, '-')}.png`;
            link.href = dataUrl;
            link.click();
        }
    };

    return (
        <div className="mt-16 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Quick Access QR Code</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Scan to quickly access this product page anytime
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* QR Code */}
                <div ref={qrRef} className="flex-shrink-0 bg-white p-4 rounded-lg shadow-md border-4 border-gray-100 dark:border-gray-700">
                    <canvas ref={canvasRef} style={{width: '200px', height: '200px'}} />
                </div>

                {/* Actions */}
                <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
                    <p className="font-mono bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm min-w-[300px] truncate break-all">
                        {productUrl}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <PrimaryButton onClick={downloadQR}>
                            📱 Download PNG
                        </PrimaryButton>
                        <SecondaryButton
                            onClick={() => {
                                navigator.clipboard.writeText(productUrl);
                            }}
                        >
                            📋 Copy Link
                        </SecondaryButton>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Print or save for quick access
                    </p>
                </div>
            </div>
        </div>
    );
}
