---
title: What If Magic Were a Field of Physics?
date: 2026-05-27
category: World Building
tags: World Building, Magic Systems, Physics, Game Design, Speculative Fiction
excerpt: I'm bored of magic that just works. So here's me trying to build spellcasting out of a fifth physical field, starting with waves, resonance, energy transfer, and conservation.
---

# What If Magic Were a Field of Physics?

So I'm getting a little bored of magic systems where a wizard waves a stick, says a few words, and a fireball just... shows up. The explanation is usually some version of *it's magic*. And that's fine for a lot of stories! But it leaves a question I find way more interesting: **if magic had always existed, wouldn't humanity have spent thousands of years studying it?**

We would've measured it, found materials that react to it, built machines around it, and eventually slapped warning labels on those machines. A modern mage would probably be less Gandalf and more a physicist arguing with an instrument that refuses to work.

So here's what I'm trying: magic as a **fifth fundamental interaction**. Quick disclaimer before anyone gets excited: the equations below are deliberately simplified models borrowed from real physics, plus one made-up field. They're not proof that this force exists, and they're definitely not a finished quantum field theory. The point is just to give this world rules that hold up for more than one spell.

## Start with a field, not a spell

A field is just something that has a value at every location. Temperature in a room is a good example: one corner can be warmer than another. A weather map is basically a picture of fields like temperature and pressure.

Now imagine there's another field filling all of space. I'm calling it the **thaumic field**. Its value can vary from place to place and change over time, a little like the height of a pond's surface when a stone creates ripples. (The field isn't literally water; the ripples are just a way to picture a disturbance spreading.)

For this first model, the field has **one value at each point**. Physicists call that a scalar field. That's a starting assumption, not a complete explanation for every spell.

## How would a magical pulse travel?

Imagine disturbing one end of a stretched string. The disturbance travels along it instead of appearing everywhere at once. A thaumic pulse could work similarly: a mage disturbs the field, and that disturbance spreads through space.

The simplest useful relationship is:

$$
\text{travel time} = \frac{\text{distance}}{\text{wave speed}}
$$

For example, if a pulse travelled at the speed of light, it would take about one second to cover 300,000 kilometres in empty space. For a simple massless version of the field, I'm choosing light speed to keep the basic model compatible with relativity. A field with a finite static range can have waves that travel more slowly, depending on their frequency. Interactions with materials could complicate how a pulse travels through them.

Here's a more complete version of the field model, using **u** for the field's value and ordinary letters throughout:

$
\frac{1}{c^2} \frac{d^2u}{dt^2} - \left(\frac{d^2u}{dx^2} + \frac{d^2u}{dy^2} + \frac{d^2u}{dz^2}\right) + a^2u = S
$

This is a compact way of describing how the field changes. **t** is time; **x**, **y**, and **z** are the three directions in space; **c** is the field's characteristic propagation speed; **a** controls its static range; and **S** describes the source driving the field. Each term such as **d²u/dt²** measures how quickly a rate of change itself changes: here, how the field's rate of change changes over time. The three spatial terms describe how the field curves across space. Each derivative is taken while the other coordinates are held fixed; physicists normally use a special symbol for that, but I'm using **d** to keep the notation familiar.

When **a = 0** and **S = 0**, this is the ordinary wave equation in three dimensions. A nonzero **a** gives a stationary localized source a static influence that falls off exponentially, with a characteristic distance of **1/a**. This is a simplified classical field equation, not a complete theory of magic.

A more detailed wave model can also give the field a limited *static* range: the influence from a stationary, localized source fades rapidly with distance. That's a separate property from how fast a pulse travels. Whether a particular spell weakens with distance also depends on how the wave spreads and what it passes through.

For a repeating wave, its speed, frequency, and wavelength are related:

$
v = f \times L
$

Here **v** is speed, **f** is frequency (the number of cycles per second), and **L** is wavelength (the distance between matching points on neighboring cycles). For example, a wave travelling at 300 metres per second with a frequency of 10 cycles per second has a wavelength of 30 metres. This relationship assumes a repeating wave travelling at a steady speed; the speed can depend on frequency in some materials.

That gives me two useful world-building questions right away: **how long does a spell take to arrive, and how much of its effect reaches the target?**

## The Thaumion: why humans can cast

If this field exists in nature, humans shouldn't be magically exempt from physics. So I imagine we evolved a special organ for it: the **Thaumion**, a small, flattish structure sitting in front of the right lung. Its cells contain structures that couple to the thaumic field, and nerves let the brain feel incoming oscillations and coordinate outgoing ones.

So it's a biological transmitter *and* receiver, not some mystical fuel tank.

This also gives the classic mage robe an anatomy explanation, which I'm way too happy about. Maybe that little round metal plate over the right side of the chest started out as protection for the Thaumion, and only later became a ceremonial badge. There's also a fun complication: a plate made of the wrong material might protect the organ physically while messing with its field output. So now armor design is a material science problem.

I haven't figured out how those cells actually work yet. Saying "the organ emits waves" is a design hypothesis, not something I've derived. But it leads to the next question: **what happens when the field hits an object?**

## Resonance: why one crystal reacts and another doesn't

Think of a kid on a swing. Push at random times and nothing much happens. Push in rhythm with the swing and it goes higher and higher. That's resonance: a system reacts really strongly when you drive it near one of its natural frequencies.

Here's a real example of vibration patterns you can actually see:

![Sand collecting along the stationary nodes of a Chladni plate vibrating at 5.289 kHz](https://upload.wikimedia.org/wikipedia/commons/0/03/Round_Chladni_plate_with_3_circular_and_4_linear_nodes.jpg)

*Photograph: Pieter Kuiper, public domain, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Round_Chladni_plate_with_3_circular_and_4_linear_nodes.jpg). The sand gathers in the spots on the plate that barely move, and the shapes change when the vibration mode changes. This isn't magic, it's exactly the kind of physics I want magic to steal from.*

Now imagine one responsive structure inside a crystal as a tiny mass attached to a spring. A passing thaumic wave pushes it back and forth. If the timing of those pushes is close to the structure's natural rhythm, the motion can grow larger. Different materials could respond to different rhythms and couple to the field with different strengths.

Real systems also have **damping**: some organized motion transfers energy to other motions or to the surroundings. That limits the response under a steady driving wave. The exact peak depends on the damping, and resonance alone doesn't tell us what the final effect will be. [OpenStax's explanation of forced oscillations](https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations) has a good introduction to the real physics.

We can describe the forces on that tiny spring-like structure without calculus notation:

$
F = F_{\text{push}} - kx - bv
$

**F** is the total force, **F push** is the wave's changing push, **x** is how far the structure is displaced from rest, and **v** is its velocity. **k** measures the spring's stiffness; **b** measures damping. The minus signs mean the spring pulls toward rest and damping opposes motion. Combining this with Newton's familiar rule, **F = mass × acceleration**, describes a simple driven, damped oscillator. It is a model for one possible response, not a complete model of a crystal.

We can take that spring model further. Let **m** be the mass, **k** the stiffness, **b** the damping, and **x** the displacement. If the wave pushes with a maximum force **F0** and repeats at angular frequency **w**, then:

$
m \frac{d^2x}{dt^2} + b \frac{dx}{dt} + kx = F_0 \cos(wt)
$

The three terms on the left represent inertia, damping, and the spring's restoring force. **dx/dt** is velocity and **d²x/dt²** is acceleration. The right side is a smoothly repeating push; **cos** is the cosine function, which simply makes that push vary in a regular cycle. **w** is measured in radians per second. Its relation to the ordinary frequency **f** in cycles per second is **w = 2 × 3.14159... × f**.

After the initial motion has died away, the amplitude **A** of the repeating motion is:

$
A = \frac{F_0}{\sqrt{(k - mw^2)^2 + (bw)^2}}
$

For a fixed push strength and frequency, this tells us how far the oscillator moves from its resting position. Its undamped natural angular frequency **w0** is given by **w0² = k/m**. When the driving frequency approaches that natural frequency, the response can become large. Damping limits it; with appreciable damping, the largest displacement occurs somewhat below the natural frequency. This formula assumes a linear spring, damping proportional to velocity, and a steady sinusoidal push.

This is how I want **magical materials** to work. A crystal doesn't need an "ice magic" category inside it. Its structure could simply respond to particular field patterns, transferring energy in ways that depend on its material and environment. The details of that coupling still need to be invented.

And that gives a reason ancient incantations and ritual instruments could've actually worked: they helped a caster repeat a specific timing, or keep a field pattern stable. Modern engineers would just replace them with better resonators and controllers. Less chanting, more knobs.

## What actually gets exchanged?

Resonance on its own doesn't make heat, cold, motion, or life. It only tells us **which systems react**. We still have to keep track of energy.

The tiny spring-like structure can store energy in its motion and in its stretched spring. As the wave pushes it, energy can move into or out of that motion. Damping then transfers some of the organized motion into other forms, often heat.

For the spring model, that stored energy **E** is:

$
E = \frac{1}{2}mv^2 + \frac{1}{2}kx^2
$

The first term is energy of motion; the second is energy stored in the spring. Here **v = dx/dt**. At any instant, the field supplies power **F push × v**, while damping transfers power **bv²** out of the organized motion. So the energy balance is:

$
\frac{dE}{dt} = F_{\text{push}}v - bv^2
$

The left side is the rate at which the oscillator's stored energy changes. The first term on the right can be positive or negative, because the field can give energy to the oscillator or take it back. The damping term is nonnegative for positive **b**, so it always removes energy from this organized motion.

Once the motion has settled into a repeating cycle, its stored energy is the same at the start and end of each cycle. Averaged over that cycle:

$$
\text{power from the field} = \text{power transferred elsewhere}
$$

**Power** just means energy transferred per second. For a steady transfer:

$
P = E / t
$

Here **P** is power in watts, **E** is energy in joules, and **t** is time in seconds. For example, transferring 100 joules over 10 seconds averages 10 watts.

For the steady oscillation above, its average absorbed power is:

$
P = \frac{bw^2A^2}{2}
$

Here **P** is average power, **b** is the damping, **w** is the driving angular frequency, and **A** is the steady displacement amplitude. This follows because the average of the squared velocity over a cycle is **w²A²/2**. It applies to the simple oscillator model under the same assumptions as the amplitude equation.



In the equation above, the equality describes averages over a full cycle, not necessarily what happens at every instant. In a simple linear model, doubling the wave's amplitude makes the average absorbed power four times as large, provided the frequency and other conditions stay the same. Real materials may stop behaving linearly at higher strengths.

**Pyromancy** could put energy into matter, where it eventually becomes heat. **Cryomancy** is harder: it has to remove energy and send it somewhere else. If the destination is warmer than the thing being cooled, the process also needs an energy input, like a fridge does. See [OpenStax on refrigerators and heat pumps](https://openstax.org/books/university-physics-volume-2/pages/4-3-refrigerators-and-heat-pumps). Fire and ice aren't automatically mirror-image spells, which I think is a cool consequence.

## Where does the energy come from?

Say a mage heats 1 kilogram of water from 20°C to 100°C. The energy needed is approximately:

$$
\text{energy} = \text{mass} \times \text{specific heat} \times \text{temperature rise}
$$

Specific heat tells us how much energy it takes to warm a given amount of a substance by one degree. For water, that's about 4,180 joules per kilogram per degree Celsius. So the calculation is:

$$
1 \times 4{,}180 \times 80 = 334{,}400 \text{ joules}
$$

That's about **334 kilojoules**, assuming the water stays liquid and ignoring energy lost to its surroundings or used to evaporate it. The mage can't just wish that energy into existence. See [OpenStax on specific heat](https://openstax.org/books/university-physics-volume-2/pages/1-4-heat-transfer-specific-heat-and-calorimetry).

For a fridge-like cooling spell, the energy budget can be written as:

$
E_{\text{released}} = E_{\text{removed}} + E_{\text{supplied}}
$

The energy released at the warmer destination includes both the energy taken from the cooled object and the work supplied to the cooling process. This is an idealized energy balance; real devices can also transfer energy to other surroundings.

The broader bookkeeping rule for a spell is:

$$
\text{energy before} = \text{energy after}
$$

Count everything involved: the source, the field, the target, their interaction, and the surroundings. Energy that seems to disappear through damping has gone somewhere else. A full mathematical model would have to account for all of those transfers consistently; this article hasn't built one yet.

Momentum has to be conserved too. To lift a rock, a mage needs some mechanism that makes a directed force, and the field or something else has to take the opposite momentum. A scalar field can in principle exert directional forces where its strength varies across space, but I haven't worked out a mechanism for precise, controlled telekinesis yet.

So the Thaumion shouldn't be an infinite battery. It might *control* a transfer, while most of the actual energy comes from fuel, a charged device, or some outside reservoir. That splits a talented **controller** from a powerful **energy source**, which is a really useful distinction for both stories and game mechanics.

## Is this quantum field theory?

Not yet, no. The picture so far is a **classical field model**: it treats the field as something that can vary continuously across space and time. In quantum field theory, a field can have particle-like excitations. I could call a hypothetical excitation of this one a **thaumon**.

That name doesn't explain healing, levitation, or a biological transmitter. Quantizing a field doesn't automatically give it whatever powers I want. I'd still need to specify what it interacts with, how those interactions work, and what the theory predicts. That's the difference between using physics as inspiration and having a complete theory.

## So where do the schools of magic come from?

Once the tiny-scale rules are locked in, the classic schools of magic turn into **engineering disciplines** instead of separate supernatural powers:

- **Pyromancy:** push energy into matter, usually through modes that turn into heat.
- **Cryomancy:** pull thermal energy out and send it to the field or some outside sink.
- **Telekinesis:** make a controlled force and account for the momentum. Still needs a better interaction model.
- **Electromancy:** selectively mess with charged matter to make currents or discharges. How that selectivity works isn't derived yet.
- **Alchemy:** rearrange molecules or materials, limited by chemistry and how much energy you have.
- **Healing:** coordinate a ridiculous number of tiny processes using accurate biological information, not just raw power.
- **Enchantment:** engineer materials that react predictably, or hold onto controlled field setups.

Healing might actually be way harder than blowing something up. An explosion mostly needs a lot of energy delivered somewhere it shouldn't be. Fixing a nerve needs you to know exactly what goes where. That difference feels a lot more meaningful to me than just giving spells arbitrary levels.

## The modern magical world probably looks pretty boring

If magic existed for thousands of years, history wouldn't just be ours with some wizard towers added. Cheap thaumic lifting might delay the invention of cranes. Reliable magical lighting might mean less reason to invent some electric lighting. Other stuff, like communications, materials, or medicine, might show up earlier.

And eventually, economics wins. If a mechanical hinge is cheaper than an enchanted hinge, people use the mechanical one. If a factory can reproduce a spell more reliably than a trained human, the factory replaces the everyday caster. A modern hospital's "healing magic" might just look like a calibrated medical device.

There are still big questions I haven't answered: what carries thaumic charge, how a Thaumion makes spatially precise patterns, how the field makes directional forces, and what ultimately supplies large amounts of energy. I'm not going to pretend those are solved.

But honestly that's exactly the part I enjoy. Instead of asking "what cool spell should I make next", I have to ask **what the universe allows**, what it costs, and what generations of curious people would build out of it.

A thousand years ago, someone might've called it sorcery. Today, they'd probably call tech support.
