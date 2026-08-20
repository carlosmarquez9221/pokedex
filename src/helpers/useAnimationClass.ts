import { ref, onMounted } from "vue";

export function useAnimationClass(defaultClass = "animate__fadeInUp") {
  const animationClass = ref(`animate__animated ${defaultClass}`);

  const setAnimationClass = (newClass: string) => {
    animationClass.value = `animate__animated ${newClass}`;
  };

  onMounted(() => {
    animationClass.value = `animate__animated ${defaultClass}`;
  });

  return { animationClass, setAnimationClass };
}