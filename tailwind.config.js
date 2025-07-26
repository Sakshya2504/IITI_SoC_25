export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        backgroundShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 12px #00c3ff, 0 0 24px #00c3ff',
          },
          '50%': {
            boxShadow: '0 0 24px #007bff, 0 0 48px #007bff',
          },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmerBlur: {
          '0%': { filter: 'blur(8px)', opacity: '0.5' },
          '50%': { filter: 'blur(2px)', opacity: '0.8' },
          '100%': { filter: 'blur(8px)', opacity: '0.5' },
        },
      },
      animation: {
        backgroundShift: 'backgroundShift 10s ease infinite',
        glowPulse: 'glowPulse 1.5s ease-in-out infinite',
        fadeInUp: 'fadeInUp 1s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        shimmerBlur: 'shimmerBlur 6s ease-in-out infinite',
      },
      backgroundImage: {
        galaxy: "radial-gradient(circle at 20% 20%, #0ff, #01011b 80%)",
        aurora: "linear-gradient(120deg, #00c3ff 0%, #007bff 50%, #0a0a2e 100%)",
      },
    },
  },
  plugins: [],
}