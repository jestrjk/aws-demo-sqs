import {expect, test} from '@oclif/test'

describe('eat:pie', () => {
  test
    .stdout()
    .command(['eat:pie'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['eat:pie', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
