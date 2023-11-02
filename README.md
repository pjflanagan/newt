# Newt

Newt is a library meant to interface with React to ensure analytics are considered from the ground up. Analytics are integrated directly into state management functions. This also allows us to playback events to speed up regression testing.

## Goals

Create an example library that:
- Provides useful generic analytics hooks and components
- Tracks event history such that we can recreate specific states during e2e testing

## Thoughts

There are many reasons why this doesn't already exist, and it isn't because analytics are an afterthought.

Having a constant analytics side-effect is bad design. In most cases, we want to be in control of when it is meaningful for analytics fire, and not just record everything is user does.

In terms of testing, this idea might not be the best either.

The fast-forwarding through testing is also not as useful as a feature as just having more robust tests. It is better to implement a function like `loginWithTestUser(cy)`, which improves readability and reliability, than to copy in a Newt procedure, which can still be flaky.

A better approach is creating custom hooks and components that work with your own unique analytic frameworks. For instance, ensuring a custom `<Button>` component requires a name prop and logging it in the `onClick` function. Or creating a `useTrackModuleVisible` hook that returns a `trackingRef` to be put on a component. In both cases it is better for the programmer to be in control of how the events fire, and not to rely on a framework that can only work in one very specific way.
