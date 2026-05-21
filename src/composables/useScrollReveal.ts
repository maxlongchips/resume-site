import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(
  containerRef: Ref<HTMLElement | null>,
  selector: string = '[data-reveal]'
) {
  let ctx: gsap.Context | null = null

  onMounted(() => {
    if (!containerRef.value) return

    ctx = gsap.context(() => {
      const elements = containerRef.value!.querySelectorAll(selector)

      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, containerRef.value)
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
