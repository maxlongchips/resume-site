import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useScrollReveal(
  containerRef: Ref<HTMLElement | null>,
  selector: string = '[data-reveal]'
) {
  let ctx: gsap.Context | null = null

  onMounted(() => {
    if (!containerRef.value) return

    if (prefersReducedMotion) {
      containerRef.value.querySelectorAll(selector).forEach((el) => {
        (el as HTMLElement).style.opacity = '1'
      })
      return
    }

    ctx = gsap.context(() => {
      const elements = containerRef.value!.querySelectorAll(selector)

      elements.forEach((el, i) => {
        const rect = el.getBoundingClientRect()
        const inView = rect.top < window.innerHeight && rect.bottom > 0

        gsap.fromTo(
          el,
          { y: 20 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            delay: inView ? i * 0.03 : 0,
            ease: 'power2.out',
            immediateRender: inView,
            scrollTrigger: inView ? undefined : {
              trigger: el,
              start: 'top 98%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, containerRef.value)
  })

  onUnmounted(() => {
    ctx?.revert()
    ScrollTrigger.getAll().forEach(t => t.kill())
  })
}
