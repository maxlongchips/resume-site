import { ref, onMounted, type Ref } from 'vue'
import gsap from 'gsap'

export function useTypingEffect(
  elementRef: Ref<HTMLElement | null>,
  text: string,
  options: { speed?: number; delay?: number; onComplete?: () => void } = {}
) {
  const displayText = ref('')
  const { speed = 50, delay = 0, onComplete } = options

  onMounted(() => {
    if (!elementRef.value) return

    gsap.to(
      { progress: 0 },
      {
        progress: text.length,
        duration: (text.length * speed) / 1000,
        delay: delay / 1000,
        ease: 'none',
        onUpdate() {
          // @ts-expect-error gsap context
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

  return { displayText }
}
