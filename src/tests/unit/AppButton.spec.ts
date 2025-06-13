import { mount } from '@vue/test-utils';
import AppButton from '@/components/atoms/AppButton.vue';
import { describe, it, expect } from 'vitest';

describe('AppButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Click me' }
    });
    expect(wrapper.text()).toContain('Click me');
  });
});