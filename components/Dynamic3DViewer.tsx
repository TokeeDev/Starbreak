import dynamic from 'next/dynamic';

const GLBViewer = dynamic(() => import('./GLBViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-96 h-96 bg-neutral-900 rounded-lg flex items-center justify-center">
      <div className="text-white animate-pulse">Loading 3D Model...</div>
    </div>
  )
});

export default GLBViewer; 