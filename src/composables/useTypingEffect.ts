import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'

export function useTypingEffect(
  elementRef: Ref<HTMLElement | null>,
  text: string,
  options: { speed?: number; delay?: number; onComplete?: () => void } = {}
) {
  const displayText = ref('')
  const { speed = 50, delay = 0, onComplete } = options
  let ctx: gsap.Context | null = null

  onMounted(() => {
    if (!elementRef.value) return

    ctx = gsap.context(() => {
      gsap.to(
        { progress: 0 },
        {
          progress: text.length,
          duration: (text.length * speed) / 1000,
          delay: delay / 1000,
          ease: 'none',
          onUpdate() {
            const idx = Math.floor(this.targets()[0].progress)
            displayText.value = text.slice(0, idx)
          },
          onComplete() {
            displayText.value = text
            onComplete?.()
          },
        }
      )
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })

  return { displayText }
}
