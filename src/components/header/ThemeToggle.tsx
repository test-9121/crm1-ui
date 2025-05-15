
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Switch } from '@radix-ui/react-switch';
import { Label } from '../ui/label';
import { useTheme } from '@/contexts/ThemeContext';


export function ThemeToggle() {
    // const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Label htmlFor="dark-mode" className="flex items-center gap-2">
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    >
                        {theme === 'dark' ? (
                            <Moon size={16} className="text-blue-400" />
                        ) : (
                            <Sun size={16} className="text-yellow-500" />
                        )}
                    </motion.div>
                    {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                </Label>
            </div>
            <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
            />
        </div>

    );
}
