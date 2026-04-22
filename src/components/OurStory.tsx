import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { Heart } from 'lucide-react';

export function OurStory() {
  return (
    <section
      id="story"
      className="py-24 px-4 bg-wedding-bg relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-25 -translate-y-1/2 translate-x-1/2 animate-blob"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 animate-blob"
        style={{ background: 'radial-gradient(circle, rgba(231,209,161,0.4) 0%, transparent 70%)', animationDelay: '3s' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-20">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-500 mb-3">
            How it all began
          </p>
          <h2 className="font-script text-5xl md:text-6xl text-gold-500 mb-4">
            Our Story
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-300" />
            <Heart size={12} className="text-gold-400 opacity-60" fill="currentColor" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-300" />
          </div>
        </AnimatedSection>

        <div className="relative">
          {/* Center Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-200 via-gold-300 to-gold-200 -translate-x-1/2" />

          <div className="space-y-20 md:space-y-28">
            {/* Milestone 1 - The Day Our Paths Crossed */}
            <AnimatedSection
              delay={0.15}
              className="relative flex flex-col md:flex-row items-start md:items-center">
              
              {/* Pulsing timeline dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 mt-2 md:mt-0 z-10">
                <div className="relative w-4 h-4">
                  <div className="w-4 h-4 bg-gold-300 rounded-full shadow-[0_0_0_4px_rgba(212,175,55,0.2)]" />
                  <div className="absolute inset-0 rounded-full bg-gold-300 opacity-40 animate-ping" style={{ animationDuration: '2s' }} />
                </div>
              </div>

              <div className="hidden md:flex md:w-1/2 md:pr-16 justify-end">
                <motion.div
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-2 shadow-lg rounded-sm -rotate-2">
                  <img
                    src="/Image_(9).jpeg"
                    alt="The Day Our Paths Crossed"
                    className="w-52 h-40 object-cover rounded-sm" />
                </motion.div>
              </div>

              <div className="ml-14 md:ml-0 md:w-1/2 md:pl-16">
                <div className="inline-block px-4 py-1.5 bg-gold-50 border border-gold-200 text-gold-600 font-sans text-xs tracking-[0.2em] uppercase mb-4 rounded-full">
                  December 11, 2021
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-wedding-text mb-3">
                  🌸 The Day Our Paths Crossed
                </h3>
                <div className="md:hidden mb-4">
                  <div className="bg-white p-1.5 shadow-md rounded-sm inline-block -rotate-1">
                    <img
                      src="/Image_(9).jpeg"
                      alt="The Day Our Paths Crossed"
                      className="w-full h-40 object-cover rounded-sm" />
                  </div>
                </div>
                <p className="font-serif text-lg text-wedding-text-light leading-relaxed">
                  Before they ever met, Kamesh first saw Shashini through a photo on a university friend’s phone. Something about her caught his attention, and he couldn’t help but ask about her. That curiosity led to a simple message, and soon they began chatting. Not long after, they finally met in person at a mutual friend’s wedding—where a genuine connection quietly began.
                </p>
              </div>
            </AnimatedSection>

            {/* Milestone 2 - Love Was Spoken */}
            <AnimatedSection
              delay={0.15}
              className="relative flex flex-col md:flex-row-reverse items-start md:items-center">
              
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gold-400 rounded-full -translate-x-1/2 mt-2 md:mt-0 shadow-[0_0_0_4px_rgba(212,175,55,0.2)] z-10" />

              <div className="hidden md:flex md:w-1/2 md:pl-16 justify-start">
                <motion.div
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-2 shadow-lg rounded-sm rotate-2">
                  <img
                    src="/Image_(8).jpeg"
                    alt="Love Was Spoken"
                    className="w-52 h-40 object-cover rounded-sm" />
                </motion.div>
              </div>

              <div className="ml-14 md:ml-0 md:w-1/2 md:pr-16 md:text-right">
                <div className="inline-block px-4 py-1.5 bg-gold-50 border border-gold-200 text-gold-600 font-sans text-xs tracking-[0.2em] uppercase mb-4 rounded-full">
                  December 22, 2021
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-wedding-text mb-3">
                  💫 Love Was Spoken
                </h3>
                <div className="md:hidden mb-4">
                  <div className="bg-white p-1.5 shadow-md rounded-sm inline-block rotate-1">
                    <img
                      src="/Image_(8).jpeg"
                      alt="Love Was Spoken"
                      className="w-full h-40 object-cover rounded-sm" />
                  </div>
                </div>
                <p className="font-serif text-lg text-wedding-text-light leading-relaxed">
                  As his feelings grew stronger, Kamesh invited Shashini to meet him at Matara Beach. Surrounded by the sound of waves and the calm of the evening, he finally shared what he had been feeling all along. It was a moment of honesty and courage—one that would shape the path of their story forever.
                </p>
              </div>
            </AnimatedSection>

            {/* Milestone 3 - When Our Hearts Aligned */}
            <AnimatedSection
              delay={0.15}
              className="relative flex flex-col md:flex-row items-start md:items-center">
              
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gold-300 rounded-full -translate-x-1/2 mt-2 md:mt-0 shadow-[0_0_0_4px_rgba(212,175,55,0.2)] z-10" />

              <div className="hidden md:flex md:w-1/2 md:pr-16 justify-end">
                <motion.div
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-2 shadow-lg rounded-sm -rotate-1">
                  <img
                    src="/Image_(10).jpeg"
                    alt="When Our Hearts Aligned"
                    className="w-52 h-40 object-cover rounded-sm" />
                </motion.div>
              </div>

              <div className="ml-14 md:ml-0 md:w-1/2 md:pl-16">
                <div className="inline-block px-4 py-1.5 bg-gold-50 border border-gold-200 text-gold-600 font-sans text-xs tracking-[0.2em] uppercase mb-4 rounded-full">
                  January 01, 2022
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-wedding-text mb-3">
                  💖 When Our Hearts Aligned
                </h3>
                <div className="md:hidden mb-4">
                  <div className="bg-white p-1.5 shadow-md rounded-sm inline-block -rotate-1">
                    <img
                      src="/Image_(10).jpeg"
                      alt="When Our Hearts Aligned"
                      className="w-full h-40 object-cover rounded-sm" />
                  </div>
                </div>
                <p className="font-serif text-lg text-wedding-text-light leading-relaxed">
                  On January 1st, 2022, a beautiful new chapter began. On her birthday, Shashini shared that she felt the same way. In that moment, two hearts came together, and our love story truly began—growing stronger with every passing day.
                </p>
              </div>
            </AnimatedSection>

            {/* Milestone 4 - A Promise for Forever */}
            <AnimatedSection
              delay={0.15}
              className="relative flex flex-col md:flex-row-reverse items-start md:items-center">
              
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gold-400 rounded-full -translate-x-1/2 mt-2 md:mt-0 shadow-[0_0_0_4px_rgba(212,175,55,0.2)] z-10" />

              <div className="hidden md:flex md:w-1/2 md:pl-16 justify-start">
                <motion.div
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-2 shadow-lg rounded-sm rotate-1">
                  <img
                    src="/Image_(7).jpg"
                    alt="A Promise for Forever"
                    className="w-52 h-auto object-cover rounded-sm opacity-90" />
                </motion.div>
              </div>

              <div className="ml-14 md:ml-0 md:w-1/2 md:pr-16 md:text-right">
                <div className="inline-block px-4 py-1.5 bg-gold-50 border border-gold-200 text-gold-600 font-sans text-xs tracking-[0.2em] uppercase mb-4 rounded-full">
                  May 8, 2025
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-wedding-text mb-3">
                  💍 A Promise for Forever
                </h3>
                <div className="md:hidden mb-4">
                  <div className="bg-white p-1.5 shadow-md rounded-sm inline-block rotate-1">
                    <img
                      src="/Image_(7).jpg"
                      alt="A Promise for Forever"
                      className="w-full h-40 object-cover rounded-sm" />
                  </div>
                </div>
                <p className="font-serif text-lg text-wedding-text-light leading-relaxed">
                  On May 8th, 2025, we took a step closer to forever. In a moment filled with love and joy, we got engaged, promising to stand by each other through all of life’s journeys.
                </p>
              </div>
            </AnimatedSection>

            {/* Milestone 5 - The Beginning of Our Forever */}
            <AnimatedSection
              delay={0.15}
              className="relative flex flex-col md:flex-row items-start md:items-center">
              
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gold-300 rounded-full -translate-x-1/2 mt-2 md:mt-0 shadow-[0_0_0_4px_rgba(212,175,55,0.2)] z-10" />

              <div className="hidden md:flex md:w-1/2 md:pr-16 justify-end">
                <motion.div
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-2 shadow-lg rounded-sm -rotate-2">
                  <img
                    src="/Image_(11).jpeg"
                    alt="The Beginning of Our Forever"
                    className="w-52 h-40 object-cover rounded-sm" />
                </motion.div>
              </div>

              <div className="ml-14 md:ml-0 md:w-1/2 md:pl-16">
                <div className="inline-block px-4 py-1.5 bg-gold-100 border border-gold-200 text-gold-600 font-sans text-xs tracking-[0.2em] uppercase mb-4 rounded-full">
                  June 4, 2026
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-wedding-text mb-3">
                  🤍 The Beginning of Our Forever
                </h3>
                <div className="md:hidden mb-4">
                  <div className="bg-white p-1.5 shadow-md rounded-sm inline-block -rotate-1">
                    <img
                      src="/Image_(11).jpeg"
                      alt="The Beginning of Our Forever"
                      className="w-full h-40 object-cover rounded-sm" />
                  </div>
                </div>
                <p className="font-serif text-lg text-wedding-text-light leading-relaxed">
                  On June 4th, 2026, we begin our greatest adventure yet. As we step into marriage, we are filled with gratitude and excitement to celebrate this beautiful milestone with the people we love most.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>);

}