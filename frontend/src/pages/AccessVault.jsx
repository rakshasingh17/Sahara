import { useState } from 'react'

export default function AccessVault() {
  const [step, setStep] = useState(1)
  const [ownerEmail, setOwnerEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOtp = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('https://sahara-x622.onrender.com/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerEmail })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setStep(2)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('https://sahara-x622.onrender.com/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerEmail, otp })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setStep(3)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            LegacyVault Access
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter the email of the person whose vault you need to access
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {['Enter Email', 'Verify OTP', 'Access Vault'].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                ${step > i + 1 ? 'bg-green-700 text-white' : step === i + 1 ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              {i < 2 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-green-700' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Deceased person's registered email
              </label>
              <input
                type="email"
                value={ownerEmail}
                onChange={e => setOwnerEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-700 bg-gray-50"
              />
            </div>
            <p className="text-xs text-gray-400">
              An OTP will be sent to the nominee's registered email.
            </p>
            <button
              onClick={handleSendOtp}
              disabled={!ownerEmail || loading}
              className="w-full bg-green-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-green-800 disabled:opacity-50 transition"
            >
              {loading ? 'Sending OTP...' : 'Send OTP →'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-sm text-green-800">
              ✓ OTP sent to the nominee's registered email
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Enter 6-digit OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-center tracking-widest text-xl focus:outline-none focus:border-green-700 bg-gray-50"
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6 || loading}
              className="w-full bg-green-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-green-800 disabled:opacity-50 transition"
            >
              {loading ? 'Verifying...' : 'Verify OTP →'}
            </button>
            <button
              onClick={() => { setStep(1); setOtp(''); setError('') }}
              className="w-full text-gray-400 text-sm hover:text-gray-600"
            >
              ← Go back
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-4">
            <div className="text-5xl">✅</div>
            <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Access Granted
            </h2>
            <p className="text-sm text-gray-500">
              You now have read-only access to this LegacyVault.
            </p>
            <a
              href="/legacy-vault"
              className="block w-full bg-green-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-green-800 transition"
            >
              View LegacyVault →
            </a>
          </div>
        )}

      </div>
    </div>
  )
}