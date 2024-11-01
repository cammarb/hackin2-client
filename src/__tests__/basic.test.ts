import { expect, test } from 'vitest'
import { helloWorld } from '../_practise/basic';
import { setupStore } from '@/app/store';


test('should return Hello, World!', () => {
    expect(helloWorld()).toBe("Hello, World!");
});

test('test initial store state', () => {
    const storeState = setupStore().getState()
    const authState = storeState.auth
    expect(authState).toStrictEqual({user: null})
})