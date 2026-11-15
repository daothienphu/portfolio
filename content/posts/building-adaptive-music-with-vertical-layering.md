---
title: Building Adaptive Music with Vertical Layering in Abyssalis
date: 2026-11-15
category: Game Development
tags: Unity, Audio, Adaptive Music, Game Design, Abyssalis
excerpt: How Abyssalis changes its music with the player's fleet, bosses, and gravity using synchronized layers and a section-based song structure.
---

Music in a game has a timing problem. A composer can decide when a chorus arrives in a recording, but a player can build something, meet a boss, or pause to plan at almost any moment. If the music is one fixed track, those moments and the music have to coexist whether or not they fit together.

For Abyssalis, I wanted the music to respond to what is happening in the game while still behaving like a song. The system uses **vertical layering** to change which parts of the arrangement are audible, and a separate section system to decide where the song goes next.

## What is vertical layering?

Imagine a song exported as several separate recordings that are meant to play together. One might contain a foundation, another a melody, and another a rhythmic part. These recordings are often called **stems**. They share a musical timeline, so the game can bring parts in or fade them out without replacing the whole piece.

The word *vertical* comes from imagining those recordings stacked on top of each other in an audio editor. Moving forward along the timeline is still the song progressing; changing which tracks are audible changes the arrangement at that point in time.

That sounds straightforward until the player asks for a new layer halfway through a bar. Starting its clip from the beginning would put it at a different point in the song. The system needs to know both **when** the new layer should join and **where** in the recording it should start.

## Where else has this been used?

There are some useful examples from composers who have described how their games' systems actually worked:

- **LittleBigPlanet:** Composer Winifred Phillips describes a six-layer system in which layers could be heard alone or in combinations, often changing as the player moved into a new area. That makes the composition challenge quite demanding: each part has to hold attention by itself while also leaving room for the others. Her [arrangement breakdown](https://www.gamedeveloper.com/audio/arrangement-for-vertical-layers-pt-1) includes demonstrations from the series.
- **Spyder:** Phillips describes action music that adds layers as the player proceeds through a mission, building a sense of momentum and progress. Exploration also uses short ambient cues, so the game doesn't depend on one technique for every situation. She discusses both approaches in [this composer interview](https://www.gamedeveloper.com/audio/composer-interview-examining-the-craft-of-video-game-music-composition).
- **Rise & Shine:** In the game's [audio post-mortem](https://www.gamedeveloper.com/audio/rise-shine-audio-post-mortem-), its composer describes adding melodic and rhythmic layers when combat starts, then returning to the ambient arrangement once the wave is cleared. A multi-phase boss adds orchestral layers as the fight progresses. That is a useful example of the same basic tool serving both immediate combat state and longer-term progress.

These are different designs, not exact copies of the Abyssalis system. LittleBigPlanet's flexible combinations, Spyder's accumulating sense of progress, and Rise & Shine's combat transitions each give layers a different job. Abyssalis uses fleet composition as one of its musical inputs and combines layers with a section-based song form.

## Writing music that can be taken apart

Exporting a finished mix as separate files is not automatically enough. In an adaptive arrangement, some combinations may be heard for a long time while others might never occur. A part that sounds great buried in the full mix can feel strangely empty on its own; several parts that each sound exciting alone can become crowded together.

Harmony is one practical constraint. If a bass stem outlines one chord progression while a melody assumes another, turning either part on at the wrong time can produce an unintended clash. Parts intended to overlap need a shared harmonic plan, or clear rules about which combinations are allowed. Rhythm matters too: two active parts can interlock, but if they both fill every gap, the full arrangement can become hard to follow.

Register is another useful tool. A low bass line, a middle-register chord part, and a higher melody have more room to coexist than three instruments competing in the same range. Counterpoint, where separate melodic lines interact, can make a combination interesting; it also needs restraint when several independently controlled lines can play at once. Phillips discusses that balance in the [Spyder interview](https://www.gamedeveloper.com/audio/composer-interview-examining-the-craft-of-video-game-music-composition).

For Abyssalis, the practical test is to listen to combinations the game can really produce: the base alone, the base with individual satellites, a dense fleet, and boss or gravity states. The code defines which combinations can happen; whether each one sounds good is a separate musical question.

## Letting the fleet shape the arrangement

In Abyssalis, the base layer provides the foundation. Other layers respond to the state of the run:

- A satellite layer is wanted when the player owns the corresponding satellite type. Multiple copies of the same type still select the same layer.
- A boss layer is wanted while its matching boss is alive. The theme layer is used when no boss is alive.
- A tension layer follows gravity: its target level increases between configured gravity thresholds.

That means the arrangement can reflect the composition of the player's fleet. A new satellite type can introduce another musical part; losing the last one of that type can take the part away. A boss changes the balance again. Gravity is handled differently from a simple on/off switch: its layer can have an intermediate target volume.

The system checks the built defenses periodically and uses their entity types to decide which satellite layers are wanted. The audio doesn't need to know every gameplay detail. It needs a small set of meaningful inputs that can be mapped to musical decisions.

## Joining on the bar

Knowing a layer is wanted is only the first step. For ordinary layers, the system waits for a bar boundary and fades the layer in or out. If a new layer joins in the middle of a section, it starts its clip at the sample corresponding to the current bar, so it lines up with the other parts instead of starting the section from the beginning.

Unity's audio clock is useful here. The system schedules playback against `AudioSettings.dspTime` with `PlayScheduled`, rather than relying on a frame update to happen at the exact musical instant. The intended start time is shared across the layers scheduled for a section.

The timing still depends on the assets. Stems for a section need compatible tempo, alignment, and musical length. Scheduling cannot fix a part that was exported with an extra beat at the beginning or a different tempo. The configuration records the tempo and section lengths in bars so the code can work out where those boundaries belong.

For a concrete example, take **120 beats per minute** in **4/4 time**, where a bar has four quarter-note beats. Each beat lasts 60 / 120 = 0.5 seconds, so a bar lasts 2 seconds and an eight-bar section lasts 16 seconds. At a 48,000 Hz sample rate, a bar spans 96,000 sample frames. These numbers are an illustration, not a claim about the tempo of a particular Abyssalis arrangement. In general, the beat unit used by the tempo and the time signature matters when calculating bar length.

The musical boundary also involves a tradeoff. Waiting for the next bar keeps a change aligned with the phrase, but it adds a delay between the gameplay event and the audible response. Shorter boundaries can feel more responsive; longer ones can preserve a musical phrase. A separate short accent, sometimes called a *stinger*, is another possible way to acknowledge an event immediately while a larger transition waits, although that is a design option rather than a feature established by this system.

Gravity is a little different: its target can change continuously with the measured value, rather than waiting for a bar to change volume. The system still needs a loaded, playing clip for that layer to be heard.

## Vertical layers meet horizontal sections

Changing the instruments is only one dimension of adaptive music. The Abyssalis system also moves through sections such as intro, verse, pre-chorus, chorus, and bridge. This is the **horizontal** part: it changes what comes next in the song.

The section choices depend on the state of the run. Early on, the system can move between verses and bridges. As a segment reaches higher energy, including later waves or higher gravity, it can move through a pre-chorus into a chorus. During a boss fight it alternates chorus and bridge. Boss arrival or defeat can request a cut to a new section on a configured bar boundary, rather than waiting for the current section to finish.

Each layer has clips for the sections it participates in, and section variants can alternate together. This gives the music room to develop over time as well as react to the current fleet. If a layer has no clip for a section, it is silent for that section.

## Keeping transitions smooth

Each layer has two Unity `AudioSource` objects. When a new section starts on one source, the outgoing clip can continue on the other, letting its tail ring underneath the incoming section. A requested cut instead fades the outgoing source quickly. That overlap matters for sounds with reverb: stopping the old clip exactly at the boundary can make the transition feel unnaturally chopped off.

Layer changes use fades too. The system applies a squared fader curve, and the boss layer has separate swell and fade-out settings. These are musical controls as much as technical ones: a layer can be perfectly synchronized and still feel abrupt if its volume jumps immediately.

More active layers also mean more combined sound. The mixer estimates active layer power from configured loudness values and applies partial gain compensation when the arrangement grows. It only attenuates; it doesn't promise perfectly constant perceived loudness or replace listening to the mix. The goal in the code is to keep a larger fleet sounding larger without letting the combined level grow unchecked.

## Loading only what the game needs

A song with multiple layers, sections, and variants can add up to a lot of audio. The stems are Addressables, and the system loads layers that are wanted or still playing. It also prepares the upcoming boss's layer. A layer that has been silent and unwanted for a configured period can be released.

Loading creates another timing constraint. If a requested layer isn't ready yet, it stays silent until loading finishes, then joins at an appropriate bar boundary. At the beginning of a run, the system waits for wanted layers up to a timeout; late layers can join afterward. A failed clip can result in silence for that part, so checking the actual assets and load behavior matters as much as checking the scheduling code.

## Other ways the mix responds

The system also changes the sound of the whole mix. During planning and slow motion, it lowers the volume and applies a low-pass filter, muffling high frequencies. The main menu reuses the song system without gameplay inputs and rolls combinations of satellite layers between sections. The project also supports different genre configurations; switching genre fades the old voices and starts the new arrangement from its intro.

For testing these decisions, the Unity editor has a Music Mixer window. It can show layer state and override layers on or off, as well as simulate conditions such as gravity, bosses, and section changes. That makes it possible to inspect combinations without playing an entire run to reach each one.

## What I like about this approach

Vertical layering makes the player's choices part of the arrangement, while the section system gives that arrangement somewhere to go. The result depends on more than a collection of interchangeable loops: the stems need to work together, transitions need timing and space, and the mix has to remain readable as parts accumulate.

The interesting design question is deciding which game states deserve a musical response. In Abyssalis, fleet composition, gravity, and bosses give the system a way to connect the score to the run without requiring a separate track for every possible situation.
