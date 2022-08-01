module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme:
    {
        extend:
        {
            backgroundImage:
            {
                'card-list-gradient': 'linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 5%, #888888 20.79%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%);',
                'card-list-gradient-desktop': 'linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #888888 19.79%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%);',
            }
        }
    }
};
