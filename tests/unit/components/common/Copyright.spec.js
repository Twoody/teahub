import { mount } from "@vue/test-utils"
import { defineComponent } from "vue"
import Copyright from "@/components/common/Copyright.vue"

const createWrapper = () => 
{
  return mount(
    defineComponent({
      components: {
        Copyright, 
      },
      template: "<Copyright />",
    }),
    {
      global: {
        stubs: [
          "FontAwesomeIcon",
        ],
      },
    }
  )
}

describe("Copyright", () => 
{
  it("renders the correct copyright text and year", () => 
  {
    const wrapper = createWrapper()
    const currentYear = new Date().getFullYear()

    expect(wrapper.text()).toContain("Copyright")
    expect(wrapper.text()).toContain(`${currentYear}`)
    expect(wrapper.text()).toContain("Tanner Woody All Rights Reserved")
    expect(wrapper.find("[data-testid=\"teahub-copyright\"]").exists()).toBeTruthy()
  })
})

