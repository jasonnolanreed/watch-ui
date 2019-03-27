BEFORE SHARING WITH BETA TESTERS
- Rename watch
- Request throttling (https://github.com/nfriedly/express-rate-limit)
- Send exceptions to ga or use something like rollbar
- Add more data to analytics events (userid, watchid, measureid, etc)
- Email validation on registration
- FAQ page
- Home page
- Change/forgot password


BEFORE SHARING WIDELY
- Search engine stuff -- <meta>, etc
- New watch setting for goal accuracy to start integrating "good/bad" theme
- User option for using atomic time or not or manually setting offset
- Proper messaging system instead of alerts
- Manual wind power reserve tools
	- Count number of winds from dead to full
	- Count number of winds from full to 24 hours later
	- Start session with full wind, add new "winds added" number to measures to track power reserve


NOT SURE YET
- "Social" aspect? Share watches to other users?
- Service worker to make PWA
- Rename "firstOfSet" to "firstOfSession" across projects
- Admin tools to see what's going on
- Pass data into custom elements where possible -- router params?
- Abstract all the time math and formatting to new utility for sharing
- Abstract some simple display sections into re-usable components (short interval warning?)
