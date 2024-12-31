export function validateInput(fragments) {
   if (!Array.isArray(fragments)) {
      throw new Error("Вхідні дані повинні бути масиво подібні")
   }
   if (fragments.length === 0) {
      throw new Error("Файл порожній")
   }

}