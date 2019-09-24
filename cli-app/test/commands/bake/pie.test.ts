import {expect, test} from '@oclif/test'

describe('bake:pie', () => {
  test
    .stdout()
    .command(['bake:pie'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['bake:pie', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
