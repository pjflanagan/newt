import { processEnv } from "@next/env";
import { eventRegistry } from "./setup";

type PlayableAction = [string, any];

// Calls each action in order for e2e tests
function playActionSequence(sequence: PlayableAction[]) {
  // use the registry of actions to play each event
  sequence.forEach(playAction);
}

async function playAction(action: PlayableAction) {
  const [name, data] = action;
  const event = eventRegistry.find((registeredEvent) => registeredEvent[0] === name);
  if (!event || !event[1]) {
    throw `No event found for ${name}`;
  } else {
    await event[1](data);
  }
}

type NewtTestRunnerProps = {
  allowedEnvironments: string[];
}

export function NewtTestRunner({ allowedEnvironments }: NewtTestRunnerProps) {
  // TODO: make this actually work
  if (!allowedEnvironments.includes('dev')) {
    return null;
  }
  // if the environment is allowed
  // hidden input field that gets data from a cypress test
  // to quickly bypass events we don't need see run
  return (<div data-testid="NEWT-TEST-RUNNER"></div>);
}