[![news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/Xyzvixx/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/Xyzvixx/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122)

# The World in One Day — Sunday 22 November 2026

One vertical front page (576×1024, 9:16) summing up 22 November 2026's world
news in a single image: **50 verified stories, 7 regions, 17 fields**.

- **3 leads** with drawn panels: COP31 nears a deal in Antalya; Iran hits US
  bases in Bahrain; Russia's overnight barrage on Ukraine (148 drones,
  3 missiles).
- **10 picture stories**: Sparta II ablaze in the Baltic, "El Chapo Isidro"
  captured, two tankers hit off Oman, three missiles at Riyadh, Florida's
  record St Johns River flood, Nepal's PM lands in Delhi, France seeks UN
  action on Myanmar, Antonelli fastest in Las Vegas, the FBI database breach,
  Denmark's foiled assassination plot.
- **37 briefs**, a UTC wire, a world-map strip, and an explicit date check.
  Every story was verified against a news source reported on 22 Nov 2026;
  overnight events are timed in UTC, and the one earlier event (the Peru
  quake, 20 Nov local / 21 Nov UTC) is marked as a follow-up. Full story list
  with sources: see STORIES.md in the bounty work directory.

## How the program works

`main.ts` (Node 22, stdlib only) is a trivial copier: it copies the
pre-rendered `entry.png` shipped in this repo to the output directory and
nothing else. Output directory, in order: `--outdir <dir>` argument,
`$MAKEFUN_OUTPUT_DIR`, `/output`, `./output`. The first candidate that accepts
the copy wins; a read-only candidate is skipped, never fatal. No rendering at
grade time, no fonts, no network, no dependencies — deterministic by
construction (a byte copy).
