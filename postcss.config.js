module.exports = {
  plugins: {
    tailwindcss: {},
    // CSS最適化記述
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
