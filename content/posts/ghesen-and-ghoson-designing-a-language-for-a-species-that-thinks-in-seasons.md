---
title: Ghesen and Ghoson: Designing a Language for a Species That Thinks in Seasons
date: 2025-04-23
category: World Building
tags: Conlang, Worldbuilding, Linguistics, Game Design, Narrative Design
excerpt: Notes from building my first constructed language for an aquatic alien species, from throat sounds no human mouth makes to a grammar that encodes the seasons themselves, and how it's shaping a post-collapse translation mechanic for my next game.
---

## Why a conlang in the first place

I'm building a game around an extinct aquatic civilization, the Kashat, and I wanted the player's main tool for understanding them to be the language itself. Not a few made-up words scattered on signage, but a real system: sounds, grammar, a vocabulary that grows from a consistent internal logic, and writing that the player can actually learn to read over the course of the game.

That meant I needed a real conlang before I could design a single scrap of in-game text. This post is a walkthrough of how Ghesen and Ghoson came together, what makes them work the way they do, and the open problems I'm still chewing on.

## Starting from biology, not grammar

The first decision I made wasn't about sounds or syntax. It was about the Kashat themselves: they're aquatic, and their lives run on a two-season cycle I'm calling Hot and Cold — a bloom season and an enduring season. I wanted that biological rhythm to be load-bearing in the language, not just flavor text.

So instead of starting with phonology, I started by asking what a Kashat sentence needs to be able to say that a human sentence doesn't. The answer became the spine of the whole grammar: nearly everything in Ghesen/Ghoson can be marked for which season it belongs to, and that marking isn't a suffix bolted on — it's woven into the vowels of the word itself.

## A sound system built for a different throat

Kashat aren't human, so I didn't want the phonology to sound like a human language with the letters shuffled. I built the consonant inventory around sounds that are rare or absent in English specifically because an alien throat shouldn't default to English defaults: a uvular stop, a couple of pharyngeal fricatives, a glottal stop. These happen to be real human phonemes too — Arabic and Hebrew both use several of them — which turned out to be useful later, for reasons I'll get to.

The more interesting part was realizing that some of what the Kashat "say" isn't vocal at all. I added four sounds that aren't produced by a vocal tract the way we understand it:

- a deep swim-bladder thump, felt more than heard
- a sharp pharyngeal-teeth click
- a sustained grinding rasp
- a fluttering buzz from the gill covers

These aren't decoration. They carry real grammatical weight — one of them marks a question, another marks a plural, and so on. Once I had them, I had to stop thinking of this as "a language with funny letters" and start thinking of it as a language with an entirely different production system, where speech and body-sound are the same channel.

## Grammar that encodes the season

Here's the mechanic I'm most happy with. Every root in the language is built from two or three consonants — a skeleton, in the Semitic-language sense — and the vowels slotted into that skeleton aren't free choices. They come in paired sets: one "Hot" and one "Cold," and the pairing is fixed (i pairs with u, e pairs with o, a pairs with å).

Take the root for "the calling" — consonants Q-L-N. Slot in Hot vowels and you get *qilen*. Slot in the Cold counterparts and the same root becomes *qulon*. Same root, same core meaning, but the season marking is carried entirely by vowel quality, the same way some real languages mark gender or number through an internal vowel change rather than an affix.

This gives me a single rule that generates an enormous amount of vocabulary for free. Every root I coin automatically has a Hot and a Cold reading, and because the Hot/Cold distinction tracks real biological states for the Kashat (abundance versus scarcity, the fresh versus the enduring), the two readings of a root are almost never just "same word, different time of year" — they tend to diverge into related but distinct meanings. *Qilen* (Hot) means something like "the bloom," abundance, a food source. *Qulon* (Cold) means a stored reserve, something kept against want. One root, one grammatical rule, two words that actually mean different things in a way a player can learn to predict.

## Building a root-based dictionary

With that rule in place, vocabulary became mostly a matter of picking new consonant skeletons and deciding what semantic territory they'd cover, then generating both season-forms from the rule rather than inventing each word individually. I've been building the dictionary in batches by domain — tools, kinship terms, trade and economy, sea creatures, geography, illness and healing, music and craft, basic mathematics — each batch adding a handful of new roots and getting both forms for free.

A couple of constraints I set for myself early on and have stuck to:

- No word can begin with the velar nasal sound, for reasons of pure phonotactic taste.
- Consonant clusters inside a root are capped at two.
- Certain sounds are reserved and never appear inside an ordinary root, so they stay distinctive wherever they do show up.

Keeping those rules consistent across every batch is what makes the language feel like it has an actual phonological identity instead of being alien-flavored randomness.

## Three scripts for three kinds of permanence

Writing turned out to be the part that needed the most rethinking, because my first instinct didn't survive contact with "these are aquatic creatures." I'd initially reached for something like writing on kelp as an everyday medium, the way we'd reach for paper. But underwater, anything kelp-like rots — which actually turned into the more interesting answer rather than a problem.

The Kashat end up with three writing systems, and the differences between them aren't arbitrary — each one trades speed against permanence on purpose:

- **Zeket**, tied into kelp strands, is quickhand. Fast, cheap, meant to rot. Used for anything that was never meant to be a record: tallies, gossip, warnings.
- **Sidek** is written into a Kashat's own shell during the brief window after molting, while it's still soft enough to carve. It cures within the molt's own lifespan — a season or two — then crumbles or falls away. Because it's written into your own body, it can't be disowned or faked, which is why it's reserved for things that need to be sincere: tattoos, tribal marks, courtship tokens, confessions.
- **Zokot**, engraved into coral or shell that the shoal cultivates specifically to keep growing, is built to outlast its author. Slow to make, and used for law, lineage, and anything meant to survive the person who wrote it.

That three-way split gave me a free idiom, too: "tie it in kelp" means *this is temporary, don't count on it*, and it's survived as an expression even in contexts that have nothing to do with writing, the way real idioms outlive their literal origin.

## Prototyping pronunciation

At some point I wanted to actually hear the language rather than just read my own romanization of it, partly to sanity-check that the sounds I'd described were actually distinguishable from each other and not just distinguishable on paper.

The non-human sounds obviously can't come from a text-to-speech engine, since they aren't speech at all — I ended up synthesizing them directly as audio: a low dual-tone thump with a fast decay for the swim-bladder sound, a short noise-burst for the click, gated noise for the rasp, and a tremolo-modulated buzz for the gill flutter.

The vocal consonants were the pleasant surprise. The uvular and pharyngeal sounds I'd picked specifically because they're rare in English turned out to be exactly the sounds Arabic's script and phonology are built around, so running the romanized words through an Arabic-language text-to-speech voice (after transliterating them into Arabic script) produced genuinely correct uvular and pharyngeal consonants — not an approximation, the actual phoneme. The vowel quality is a bit flattened in the process, since Arabic's vowel inventory is smaller than mine, but the consonant skeleton — the part that actually carries the root meaning — came through accurately. It was a good reminder that "alien language" sound design doesn't have to mean "sounds no human has ever made." Plenty of unfamiliar-to-English sounds already exist in human mouths; I just had to go looking in the right language family.

## Designing the game around a dead civilization

All of this phonology and grammar work is in service of a specific mechanic: the game is set after the Kashat civilization has already collapsed, and the player reconstructs the language entirely from what's left behind, the same way real historical linguists work from inscriptions and never get to ask a native speaker a clarifying question.

That constraint changes what counts as a viable teaching tool in the game. Anything that depends on a living speaker or an unbroken oral tradition — drum-counting, song, spoken ritual — can't just appear as a conveniently intact artifact unless I give it a specific, diegetic reason to have survived. What can survive, and in what quantity, follows directly from the writing-systems work above: zokot is common, because coral is built to outlast generations by design. Sidek is rare and incidental, showing up only where some accident of preservation — a sealed brine pocket, a burial niche — happened to keep a molt from crumbling. Zeket is almost entirely gone, except for one isolated, sealed-off cave system where the kelp never had the chance to decay.

That distribution is doing real design work: it means the bulk of what the player reconstructs is the formal register — law, lineage, the things coral was built to carry — and the casual, intimate, and spoken registers are deliberately scarce and special when they do turn up. The player isn't just translating a language; they're noticing, correctly, that an entire category of how these creatures actually talked to each other has mostly been lost, and piecing together what they can from the edges of it.

## What's still open

A few things I haven't locked down yet:

- Whether to give the player an in-fiction reason for any sound-based clues at all, given that recordings shouldn't plausibly have survived a collapse — or whether to drop audio-based puzzles from the design entirely and lean fully into the "everything is written" constraint.
- How much of the vowel-quality nuance in the Hot/Cold contrast I actually want the player to be able to notice, versus how much is there for my own worldbuilding consistency and will mostly stay invisible in play.
- Where the line is between "the player has enough evidence to reconstruct this rule" and "I'm just telling them the rule" — the whole point of a discoverable-scraps system is that the generalization has to feel earned.

If you're building something similar, my biggest takeaway so far is this: the grammar decisions that end up mattering most aren't the exotic ones, they're the ones tied back to something true about the species. The Hot/Cold vowel system isn't interesting because it's unusual — plenty of real languages mark meaning through internal vowel change. It's interesting because it's the same fact about these creatures (they live by season) showing up in their biology, their writing, and their grammar all at once. That's the thread I'm trying to pull on for the rest of the project.
