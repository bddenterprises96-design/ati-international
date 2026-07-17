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

      {/* WeChat Button - Real App Icon */}
      <button
        onClick={() => setShowWeChat(!showWeChat)}
        title="WeChat"
        className="w-14 h-14 rounded-lg bg-[#07C160] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.5 2C4.364 2 1 4.998 1 8.5c0 1.816.905 3.459 2.337 4.545a.5.5 0 0 1 .181.56l-.318 1.174a.25.25 0 0 0 .386.267l1.66-.97a.5.5 0 0 1 .412-.064 8.3 8.3 0 0 0 2.342.336c.177 0 .352-.008.526-.022-.507-1.583.153-3.142 1.258-4.123 1.291-1.147 3.07-1.615 4.715-1.481C13.416 4.985 10.982 2 8.5 2zM5.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4.5 2.5c-2.69 0-5 2.014-5 4.5s2.31 4.5 5 4.5c.805 0 1.572-.17 2.254-.478a.5.5 0 0 1 .497.049l1.358.793a.25.25 0 0 0 .386-.267l-.349-1.29a.5.5 0 0 1 .096-.483C19.597 14.322 20 12.938 20 12c0-2.486-2.31-4.5-5-4.5zM11.5 12.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
        </svg>
      </button>

      {/* WhatsApp Button - Square Shape */}
      <a
        href="https://wa.me/923000000000"
        target="_blank"
        rel="noreferrer"
        title="WhatsApp"
        className="w-14 h-14 rounded-lg bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.813.729 5.463 2.006 7.769L0 32l8.48-2.218A15.934 15.934 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.29 13.29 0 01-6.777-1.856l-.486-.29-5.03 1.316 1.34-4.897-.317-.502A13.29 13.29 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.293-9.946c-.4-.2-2.368-1.167-2.734-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.686-.621-3.21-1.978-1.186-1.057-1.987-2.363-2.22-2.763-.233-.4-.025-.616.175-.816.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.779-.656-.674-.9-.686-.233-.013-.5-.016-.767-.016-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333 0 1.967 1.433 3.867 1.633 4.133.2.267 2.82 4.307 6.833 6.033.955.412 1.7.658 2.28.842.958.305 1.831.262 2.52.159.769-.115 2.368-.967 2.701-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467z"/>
        </svg>
      </a>
    </div>
  )
}