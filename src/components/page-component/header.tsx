
import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../ui/theme-provider'


const Header = () => {
    const { setTheme, theme } = useTheme()
    const isDark = theme === 'dark'
    return (
        <header className='border-b sticky z-50 top-0 w-full  py-2  to-background backdrop-blur-md supports-[backdrop-filter]: bg-background/60'>
            <div className=' mx-auto container  flex justify-between  px-2 items-center'>

                <Link to='/'>
                    <img src='/logo.png' alt='logo' className='h-20 object-cover' />
                </Link>
                {/* todo:search box */}

                <div className={` flex items-center cursor-pointer  transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`} onClick={() => setTheme(isDark ? "light" : "dark")}>
                    {
                        isDark ?
                            <Sun className="size-5 rotate-0 transition-all text-orange-600" /> :
                            <Moon className="size-5 git init rotate-0 transition-all text-blue-700" />
                    }
                </div>
            </div>
        </header>
    )
}

export default Header
