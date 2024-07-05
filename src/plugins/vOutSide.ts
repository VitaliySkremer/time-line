export default {
  name: 'vOutSide',
  mounted(el:any, { value }: any) {
    el.clickOutside = function (event: Event) {
      if (!(el === event.target || el.contains(event.target))) {
        value(event);
      }
    };
    document.addEventListener('click', el.clickOutside);
  },
  unmounted(el:any) {
    document.removeEventListener('click', el.clickOutside);
  },
};
