import {expect, test} from '@oclif/test'

describe('bake:cake', () => {
  test
    .stdout()
    .command(['bake:cake'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['bake:cake', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
