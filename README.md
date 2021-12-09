# **Estimate Currency Form**

## **_Overview_**

The purpose of this project is to allow users to enter a donation amount in **USD** and then see what this would equate to in **GBP**, with the live conversion rate being supplied by a remote service.
 

The project was scaffolded using `create-react-app` as a quick way to have bundling and transpilation available. Additionally if the requirements grew and for example persisting values in a database was needed, SSG or client side routing then there would be a simple route to this by integrating with `create-next-app`

Tests were written using **React Testing Library** (part of [Testing Library](https://testing-library.com/) &nearr;) and [Jest DOM Matchers](https://github.com/testing-library/jest-dom) &nearr;

## **_The User Stories_**

> Given the Amount text field has been entered to 50  
When the Calculate button is pressed  
Then Estimate text field should be updated to 35.97, which is calculated based on the live currency rate from the api

> When the Estimate text field is updated to a value with more than 2 decimal fields  
Then it should be rounded to 2 decimal fields


## **_To Run Locally_**

````
git clone git@github.com:benjamin-white/estimate-currency-form.git
cd estimate-currency-form
npm i
npm run start
````

After running the above commands localhost:3000 should be open in your default browser and the project viewable there.

To run the test suite use `npm run test` in the project's root directory.

## **_Improvements_**

I would extract the `handleSubmit` function from inside the `EstimateDonation` component into a more generic fetch helper or React hook. This would make it reusable and easier to test (albiet the methodology of React Testing Library might be to discourage testing this directly instead favouring to test the UI effect).

Styles could get out of hand pretty quickly so if the project grew or with more time I would setup SASS transpilation and/or use a CSS utility library to minimise CSS bloat.

With more time I would improve the tests. I feel coverage is fairly good, though in for example `Card.test.js` there is a danger of having vacuous tests. As tests are not a day to day activity for me at the moment I feel the depth and accuracy of them could be improved.

## **_Future Features_**

As an enhancement I would add dropdown selects to the currency form's from and to values so they could be defined by the user thereby increasing the overall utility of the `EstimateDonation` component.