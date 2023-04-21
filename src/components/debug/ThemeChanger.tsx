'use client';

import { useTheme } from 'next-themes';

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <div>
        The current theme is: {theme}
      </div>
      <div>
        <button onClick={() => setTheme('light')}>Light Mode</button>
      </div>
      <div>
        <button onClick={() => setTheme('dark')}>Dark Mode</button>
      </div>
    </>
  )
}

export default ThemeChanger