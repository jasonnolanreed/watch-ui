export const makeTemplate = (component) => (
`
<h1><gwbw-icon name="insert_chart"></gwbw-icon> Stats</h1>
<div><b>Users:</b> ${component.stats.users}</div>
<div><b>Pre Users:</b> ${component.stats.preusers}</div>
<div><b>Watches:</b> ${component.stats.watches}</div>
<div><b>Measures:</b> ${component.stats.measures}</div>
`
);
