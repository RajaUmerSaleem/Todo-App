import { useEffect, useState } from 'react'

const isStandalone = () => {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
}

const isIOS = () => {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showIOSGuide, setShowIOSGuide] = useState(false)

  useEffect(() => {
    if (isStandalone()) return

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setShowIOSGuide(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    if (isIOS() && !isStandalone()) {
      setShowIOSGuide(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  if (isStandalone() || (!deferredPrompt && !showIOSGuide)) return null

  return (
    <div className='fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-[420px] bg-slate-900 border border-slate-700 rounded-xl shadow-xl shadow-black p-4 z-50'>
      <div className='flex items-center gap-3'>
        <img src='/icons/pwa-192x192.png' alt='Todo App' className='w-12 h-12 rounded-lg' />
        <div className='flex-1'>
          <p className='text-white font-bold text-lg'>Install Todo App</p>
          <p className='text-gray-400 text-sm'>Add to your device for quick access.</p>
        </div>
      </div>
      <div className='flex gap-2 mt-3'>
        {deferredPrompt && (
          <button
            onClick={handleInstall}
            className='flex-1 py-2 bg-green-700 hover:bg-green-500 text-white font-bold rounded-lg transition-colors'
          >
            Install
          </button>
        )}
        {showIOSGuide && !deferredPrompt && (
          <p className='flex-1 py-2 text-white text-sm text-center bg-blue-700 font-semibold rounded-lg'>
            Tap <span className='font-extrabold'>Share</span> then &#8220;Add to Home Screen&#8221;
          </p>
        )}
        <button
          onClick={() => {
            setDeferredPrompt(null)
            setShowIOSGuide(false)
          }}
          className='w-24 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors'
        >
          Later
        </button>
      </div>
    </div>
  )
}

export default InstallPrompt