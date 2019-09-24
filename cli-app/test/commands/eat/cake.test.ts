import {expect, test} from '@oclif/test'

describe('eat:cake', () => {
  test
    .stdout()
    .command(['eat:cake'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['eat:cake', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
