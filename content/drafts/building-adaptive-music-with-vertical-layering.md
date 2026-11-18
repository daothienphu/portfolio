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

## What is actually inside each layer?

The most concrete way to explain the arrangement is to look at the original **synth version**. Its layer plan is built around D minor, a 120 BPM tempo, and 4/4 time. Rock, jazz, and chiptune have their own songs and arrangements, so the instrumentation below describes the synth version rather than every genre.

The **Base** has a wide supersaw pad, a low sine-wave sub following the chord roots, and section accents such as a chorus crash and a pre-chorus snare roll. A supersaw combines detuned sawtooth waves to make a wide, dense sound; a pad holds notes to give the music a sustained background. The base carries the harmony because a player might have few optional layers active. It needs to give the arrangement somewhere to stand on its own.

The **Theme** carries the recognizable lead: a chorus hook, reinforced an octave lower, and a slower bridge line. In the synth arrangement it is silent in the intro, verse, and pre-chorus. It fades away during a boss fight so the boss's own lead has room. That separation also gives the game a clear change in musical identity when a boss arrives.

The **satellite layers** each have a different job and character:

- **Standard:** kick drum and an eighth-note plucked bass pattern. This supplies a rhythmic engine without depending on another satellite for the pulse.
- **Tesla:** electric claps on beats two and four, plus distorted chords cut into a repeating sixteenth-note gate. The claps create a backbeat while the rapidly pulsing chords suggest an electrical texture.
- **Laser:** sixteenth-note hi-hats and a gliding theremin-like line. The hats provide motion; the sustained, sliding lead suggests a continuous beam.
- **Missiles:** a tom groove and a bright arpeggio, a chord played as a sequence of notes. In one pattern, accents group subdivisions into a 3-3-2 feel, giving the part a recognizable rhythm above the lower bass.
- **Railgun:** a syncopated slap-bass riff built around roots, octaves, and fifths, with offbeat finger snaps. Syncopation shifts accents away from the most expected beats, giving the weapon a punchy rhythmic identity.
- **Flak:** shaker and open hi-hat patterns, adding high-frequency percussion without requiring another melody.
- **Heavy Cannon:** a half-time drum feel with kick, large snare, and sub boom. Half-time makes the beat feel broader and heavier while the underlying tempo stays the same.
- **Gravity Well:** a pulsing wobble bass. Its part was moved an octave above the deepest sub so it has a better chance of being heard alongside the base.
- **Reinforcer:** short, repeated string notes called a *spiccato ostinato*, paired with a low taiko drum. The repeated figure gives it a persistent, defensive character.
- **Minelayer:** a repeating, syncopated marimba pattern: a row of short mallet notes that echoes the idea of laying mines.
- **EMP:** bit-crushed glitch percussion and high electronic blips. Bit-crushing deliberately reduces digital resolution to create a rough, broken texture.
- **Miner:** metallic knocks in a 3-3-2 rhythm and a low thud, suggesting machinery and drilling.
- **Nova:** a choir-like pad, bright synth stabs, and occasional crashes for a larger, more explosive color.

These are arrangements, not one-instrument-per-layer rules. A layer can bundle percussion and a pitched part because the game turns the whole stem on or off as one unit. Section treatment changes the patterns too: an intro can be sparser than a chorus, so the list describes the layer's role across the song rather than promising that every sound plays in every bar.

The **boss layers** also combine a lead with percussion. For example, Bastion has a brass-like fanfare and march-style snare; Hive has buzzing fast figures and shaker-driven percussion; Juggernaut uses distorted power-chord rhythms and heavy drums. They are written over the shared synth-song harmony so a boss part can sit above different fleets. Only one boss layer is selected at a time, and the regular Theme steps aside.

Finally, **Tension** is a drone with close, dissonant notes and a high cluster. Its level follows gravity. Unlike a satellite's rhythm or a boss's melody, its job is to add pressure to the existing arrangement as a continuous game value changes.

## How the synth layers are made

The project includes a Python music generator rather than only a folder of finished tracks. It defines the chord progressions and note patterns, assigns those patterns to instruments and stems, renders the parts to audio, and writes separate section clips. It can also produce MIDI and previews. The project supports importing suitably named stems exported from a digital audio workstation as an alternative.

The synth song starts with a shared harmonic map. For example, its intro moves through D minor, B-flat major, G minor, and A7 colors; the chorus uses a different progression and carries the hook. The section endings are designed around A7, giving the next section a common harmonic handoff. Extended and suspended chords add color to the underlying harmony. The optional parts use the chord plan so that, when the game combines them, they are not each following an unrelated progression.

The generator then gives each part a role and changes its treatment by section. An intro might thin out a pattern; the pre-chorus builds toward the chorus; the chorus is fuller; and the bridge uses a half-time feel. Some parts have their own exceptions. The result is not simply the same short loop with instruments muted: the individual stems have section-specific material.

There are also **A and B variants**. In the synth version, several B sections use different chord progressions and rhythmic patterns. The chorus retains its chords and the beginning of its hook, with a different answer later in the phrase. When a section returns, the system alternates its variants across the active layers together, so the different parts follow the same version of the harmony.

For rendering, note events are turned into synthesized instrument and percussion audio, combined into each stem, and processed with effects such as reverb and delay. The generator normalizes part levels, applies stem effects, and keeps a four-second tail after each section so the outgoing sound can continue under the next one. It writes section and variant clips along with loudness information. Unity's content setup picks up the named clips and assigns them to the music configuration and Addressables.

The other genres have their own song definitions, including their own tempo, harmony, melody, and parts, while keeping the same broad layer roles. That distinction came from an iteration: simply giving the synth arrangement different instrument sounds didn't make the jazz and chiptune versions feel like their own music.

## What changed after listening

The layer plan evolved through feedback. Earlier versions had too many melodic parts and not enough rhythm, so a fleet with Standard, Tesla, and Laser could lack the percussion the arrangement needed. The plan was revised to distribute rhythmic and bass material across the satellites: kick in Standard, claps in Tesla, hats in Laser, and toms in Missiles.

Some parts were technically present but hard to notice because they occupied the same low register as the base or Standard bass. Gravity Well's wobble moved up an octave; Missiles gained a brighter, higher arpeggio; and Reinforcer became a string ostinato with taiko. Railgun and Minelayer were also rewritten after earlier sounds didn't work for the listener. The useful lesson was to check **masking**: if two parts compete in the same frequency range and rhythm, making one merely exist in the mix does not mean it can be heard clearly.

Another round of feedback identified repetition when the fleet stayed unchanged. The response was to add the song sections, a recognizable Theme, and later the A/B variants. That is why the horizontal structure matters even when none of the player's satellites change.

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
