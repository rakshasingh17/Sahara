import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F0E8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-1 { animation: fadeSlideUp 0.8s ease forwards; animation-delay: 0.1s; opacity: 0; }
        .animate-2 { animation: fadeSlideUp 0.8s ease forwards; animation-delay: 0.3s; opacity: 0; }
        .animate-3 { animation: fadeSlideUp 0.8s ease forwards; animation-delay: 0.5s; opacity: 0; }
        .animate-4 { animation: fadeSlideUp 0.8s ease forwards; animation-delay: 0.7s; opacity: 0; }
        .animate-5 { animation: fadeSlideUp 0.8s ease forwards; animation-delay: 0.9s; opacity: 0; }
      `}</style>

      <div className="animate-1" style={{
        background: 'white',
        padding: '1.2rem',
        borderRadius: '20px',
        marginBottom: '1.5rem'
      }}>
        <span style={{ fontSize: '2rem', color: '#6B8F71' }}>♡</span>
      </div>

      <h2 className="animate-2" style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic',
        fontSize: '2.5rem',
        color: '#6B8F71',
        marginBottom: '1rem'
      }}>Sahara</h2>

      <h1 className="animate-3" style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '2.2rem',
        color: '#2C2C2C',
        maxWidth: '550px',
        lineHeight: '1.3',
        marginBottom: '1.5rem'
      }}>We help you figure out <span style={{ color: '#6B8F71' }}>what comes next.</span></h1>

      <p className="animate-4" style={{
        color: '#555',
        maxWidth: '480px',
        lineHeight: '1.8',
        marginBottom: '2.5rem',
        fontSize: '1rem',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        Navigating the practical logistics after losing a loved one can feel overwhelming. Sahara gently guides you through funeral arrangements, legal documents, and finances, one step at a time.
      </p>

      <button
        className="animate-5"
        onClick={() => navigate('/login')}
        style={{
          backgroundColor: '#6B8F71',
          color: 'white',
          border: 'none',
          padding: '1rem 2.5rem',
          borderRadius: '12px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: '600'
        }}>
        Get Started
      </button>
    </div>
  )
}

export default Landing