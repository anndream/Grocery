export default function makeActionCreator(type: string, payload?: any) {
  const action = { type: type, payload: payload };
  return action;
}
