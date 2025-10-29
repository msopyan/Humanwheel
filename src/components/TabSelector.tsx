import { motion } from 'motion/react';

interface TabSelectorProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabSelector({ tabs, activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex gap-4 p-2 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 mb-8">
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 py-4 px-8 rounded-2xl relative transition-colors text-center text-2xl ${
            activeTab === tab ? 'text-white' : 'text-white/50 hover:text-white/75'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl shadow-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </motion.button>
      ))}
    </div>
  );
}
