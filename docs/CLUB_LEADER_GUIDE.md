# Club leader guide

For whoever runs the English Club sessions. No programming needed beyond editing one line of text.

## Changing the Club Word of the Week

1. Open `game.js` in any text editor (Notepad, TextEdit, VS Code, or GitHub's web editor).
2. Near the very top, find:

   ```js
   const CLUB_WORD = 'friendship';
   ```

3. Replace the word between the quotes. Use **lower-case letters a–z only**, at least 3 letters, no spaces.
4. Save. If the game is hosted on GitHub Pages, commit the change; the site updates within a minute or two.

What players see: the word appears on the title screen. Typing it in a run (when the target letter matches its first letter) gives **Club Spirit, +300**, once per run. The word is always accepted, even if it isn't in the built-in word list.

**Picking a good word:** it should start with a common letter (not Q, X or Z) so players get a fair chance to use it, and ideally be 7+ letters so it also fires a Mega laser.

## Setting the club colours

Also at the top of `game.js`:

```js
const CLUB_COLORS = ['#FB0615', '#FEF718'];
```

The first value is the main (hull) colour, the second is the trim colour; the first also becomes the "club" laser colour. Values are hex colour codes; any online colour picker gives them. The current values are the red and yellow of the club logo.

## Hosting

The game is two files with no install step. Options, simplest first:

| Option | Good for | How |
| --- | --- | --- |
| Open the file | One laptop | Double-click `index.html`. Scores save in that browser. |
| USB / shared folder | A computer lab | Copy the folder to each machine; open `index.html`. |
| GitHub Pages | Phones and home play | Repo → Settings → Pages → Deploy from branch `main`, folder `/ (root)`. Share the URL (a QR code on the whiteboard works well). |

## How scores are stored

Leaderboard, Word Collection and personal best are saved **in the browser on that device**. That means:

- Each device has its own top 10. A shared club laptop becomes the club leaderboard.
- A different browser, a private window, or clearing browsing data starts fresh.
- Nothing is sent anywhere; no account or sign-in.

## Resetting scores

To clear the leaderboard on a club device before a competition:

1. Open the game, press **F12** (or right-click → Inspect) and choose the **Console** tab.
2. Paste and press Enter:

   ```js
   localStorage.removeItem('llb.leaderboard')
   ```

3. Reload the page.

To reset everything (ship, words, best, sound):

```js
['llb.ship', 'llb.leaderboard', 'llb.collection', 'llb.settings'].forEach(k => localStorage.removeItem(k))
```

## Running a playtest session

The MVP needs one club playtest before 1.0. Useful things to note, one line per player:

- Device and browser.
- How long their runs last (the recap shows the chain; a phone stopwatch is fine). Target: learners 2–3 minutes.
- Words they were sure were real but got "Not in word list" (feeds the word-list cleanup).
- Moments they looked confused or asked a question.
- Whether they spent time in the Hangar.

These answers close the open questions in the [roadmap](ROADMAP.md#open-questions-blocking-or-affecting-mvp).
