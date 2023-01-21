/* eslint-disable  no-undef */

const port = 5000;
const host = 'localhost';
const appUrl = `http://${host}:${port}`;
const appArticlesUrl = appUrl + '/articles'

// BEGIN (write your solution here)

test('main page opens', async () => {
  await page.goto(appUrl)
  await expect(page).toMatch('Welcome to a Simple blog!')
})

test('go to articles list', async () => {
  await page.goto(appArticlesUrl)
  // await page.waitForNavigation()
  await expect(page).toMatch('Articles')
})

test('create article', async () => {
  await page.goto(appArticlesUrl)
  await Promise.all([
    page.click('a[data-testid="article-create-link"]'),
    page.waitForNavigation()
  ])

  await expect(page).toMatch('Create article')
})

test('fill form and submit', async () => {
  await page.goto(appArticlesUrl)

  await Promise.all([
    page.click('a[data-testid="article-create-link"]'),
    page.waitForNavigation()
  ])

  await expect(page).toMatch('Create article')

  await expect(page).toFillForm('form[method="post"]',{
    'article[name]': "John Dow",
    'article[content]': 'Some content',
  })

  await expect(page).toSelect('select[name="article[categoryId]"', '1')

  await Promise.all([
    page.click('input[data-testid="article-create-button"]'),
    page.waitForNavigation()
  ])

  await expect(page).toMatch('Articles')
  await expect(page).toMatch('John Dow')
})

test('edit article', async () => {
  await page.goto(appArticlesUrl)
  await Promise.all([
    page.click('a[data-testid="article-edit-link-4"]'),
    page.waitForNavigation()
  ])

  await expect(page).toMatch('Edit article')

  await expect(page).toFillForm('form', {
    'article[name]': 'Join Smith',
    'article[content]': 'Joins content'
  })

  await expect(page).toSelect('select[name="article[categoryId]"', '2')

  await Promise.all([
    page.click('input[data-testid="article-update-button"]'),
    page.waitForNavigation()
  ])

  await expect(page).toMatch('Join Smith');

})

// END

