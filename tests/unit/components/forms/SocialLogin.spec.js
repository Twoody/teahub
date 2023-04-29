import { mount } from 'vitest/vue'
import { defineComponent } from 'vue'
import Copyright from 'path/to/Copyright.vue'

const createWrapper = () => {
  return mount(defineComponent({
    components: { Copyright },
    template: '<Copyright />',
  }))
}

describe('Copyright', () => {
  it('renders the correct copyright text and year', () => {
    const wrapper = createWrapper()
    const currentYear = new Date().getFullYear()

    expect(wrapper.text()).toContain(`Copyright`)
    expect(wrapper.text()).toContain(`©`)
    expect(wrapper.text()).toContain(`${currentYear}`)
    expect(wrapper.text()).toContain(`Tanner Woody All Rights Reserved`)
  })
})

