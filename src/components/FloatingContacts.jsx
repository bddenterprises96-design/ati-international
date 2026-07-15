import { useState } from 'react'

export default function FloatingContacts() {
  const [showWeChat, setShowWeChat] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">

      {/* WeChat Popup */}
      {showWeChat && (
        <div className="bg-white border border-[#c5c6cd] rounded-xl shadow-2xl p-5 w-52 text-center mb-2">
          <div className="font-bold text-[#005691] text-sm mb-2">Scan to Add on WeChat</div>
          <div className="w-32 h-32 bg-[#f2f4f6] border border-[#c5c6cd] rounded-lg mx-auto flex items-center justify-center">
            <span className="text-xs text-[#505f76] text-center px-2">Your WeChat QR Code Here</span>
          </div>
          <button
            onClick={() => setShowWeChat(false)}
            className="mt-3 text-xs text-[#505f76] hover:text-[#005691]"
          >
            Close
          </button>
        </div>
      )}

      {/* WeChat Button */}
      <button
        onClick={() => setShowWeChat(!showWeChat)}
        title="WeChat"
        className="w-14 h-14 rounded-full bg-[#07C160] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2C8.268 2 2 7.805 2 14.938c0 3.916 1.932 7.418 4.962 9.77L5.5 30l5.418-2.816A15.07 15.07 0 0016 27.875c7.732 0 14-5.805 14-12.937C30 7.805 23.732 2 16 2z"/>
        </svg>
      </button>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/923000000000"
        target="_blank"
        rel="noreferrer"
        title="WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.813.729 5.463 2.006 7.769L0 32l8.48-2.218A15.934 15.934 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.29 13.29 0 01-6.777-1.856l-.486-.29-5.03 1.316 1.34-4.897-.317-.502A13.29 13.29 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.293-9.946c-.4-.2-2.368-1.167-2.734-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.686-.621-3.21-1.978-1.186-1.057-1.987-2.363-2.22-2.763-.233-.4-.025-.616.175-.816.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.779-.656-.674-.9-.686-.233-.013-.5-.016-.767-.016-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333 0 1.967 1.433 3.867 1.633 4.133.2.267 2.82 4.307 6.833 6.033.955.412 1.7.658 2.28.842.958.305 1.831.262 2.52.159.769-.115 2.368-.967 2.701-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467z"/>
        </svg>
      </a>
    </div>
  )
}