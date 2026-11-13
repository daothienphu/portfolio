---
title: What If Magic Were a Field of Physics?
date: 2026-05-27
category: World Building
tags: World Building, Magic Systems, Physics, Game Design, Speculative Fiction
excerpt: I'm bored of magic that just works. Here's an attempt to build spellcasting from a fifth physical field, starting with waves, resonance, energy transfer, and conservation.
---

# What If Magic Were a Field of Physics?

I'm getting a little bored of magic systems where a wizard waves a stick, says a few words, and a fireball materializes. The explanation is usually some variation of *it's magic*. That can work perfectly well for a story. But it leaves a question I find far more interesting: **if magic had always existed, wouldn't humanity have spent thousands of years studying it?**

We would have measured it, found materials that respond to it, built machines around it, and eventually put warning labels on those machines. A modern mage might be less like Gandalf and more like a physicist arguing with a malfunctioning instrument.

So I'm trying to design magic as a **fifth fundamental interaction**. The equations below are deliberately simplified models borrowed from established physics, extended with one fictional field. They are not evidence that such a force exists, or a finished quantum field theory. The point is to give this world rules that survive more than one spell.

## Start with a field, not a spell

A field is something with a value at every location. Temperature in a room is a familiar example: one corner can be warmer than another. A weather map is a picture of fields such as temperature and pressure.

Now imagine another field permeating space. I'll call it the **thaumic field**, and describe it as:

```text
φ(x, t)
```

Read this as “the value of phi at position x and time t.” Here `x` represents a location in three-dimensional space, and `t` is time. The value can change when something disturbs the field, just as the surface of a pond changes when a stone hits it. The field isn't literally a fluid; ripples are only an intuition for how a disturbance propagates.

To start, I want the smallest possible model: **one scalar value per point**. Later, I may need a vector field for more convincing telekinesis and directional forces.

## How would a magical pulse travel?

Before writing a field equation, consider a vibrating string. A disturbed part of the string pulls on its neighbors, and that disturbance travels along the string. Two things matter: how the string changes *over time* and how its shape changes *from place to place*.

A simple one-dimensional wave equation is:

```text
(1/v²) ∂²φ/∂t² − ∂²φ/∂x² = 0
```

The notation looks worse than the idea:

- `∂²φ/∂t²` describes how quickly the field's rate of change is itself changing over time, like acceleration.
- `∂²φ/∂x²` describes the curvature of the field across space: whether one location sits above or below its neighbors.
- `v` is the speed at which the disturbance travels.
- `= 0` means we're describing a freely traveling disturbance, with no external source acting on it.

Real space has three dimensions, so I replace the single spatial term with a **Laplacian**, written `∇²φ`. It measures spatial curvature across all three directions. Then I add a source, and one extra parameter that can make the field's static influence short-ranged:

```text
(1/cφ²) ∂²φ/∂t² − ∇²φ + μ²φ = J
```

This is a sourced Klein–Gordon-type equation, used here **classically**. `cφ` is the field's propagation speed; `μ` is an inverse-length parameter; and `J` tells us where matter is driving the field. Setting `μ = 0` gives a massless wave equation. When `μ > 0`, the static influence of a localized source typically falls off exponentially over a characteristic distance `1/μ`.

For the cleanest relationship with relativity, I would set `cφ` equal to the speed of light, at least until there's a reason not to.

The worldbuilding payoff is immediate: a spell has a **travel time**, and its effectiveness can depend on **range**. Neither needs an arbitrary number in a rulebook.

## The Thaumion: why humans can cast

If the field exists in nature, humans shouldn't be uniquely exempt from physics. I imagine we evolved a specialized organ: the **Thaumion**, a small, flattened structure in front of the right lung. Its cells contain structures that couple to the thaumic field. Nerves let the brain detect incoming oscillations and coordinate outgoing ones.

That makes it a biological transmitter *and* receiver, rather than a mystical fuel tank.

It also gives an old-fashioned mage's robe an anatomical explanation. Perhaps that little circular metal plate over the right chest originally protected the Thaumion from injury, before becoming a ceremonial badge. There's a complication I like: a plate made from the wrong material might shield the organ physically while interfering with its field output. Armor design becomes material science.

I haven't established how those cells work yet. Saying an organ emits waves is a design hypothesis, not a derivation. But it points to the next question: **what happens when a field reaches an object?**

## Resonance: why one crystal responds and another doesn't

Think of a child on a swing. Push at random times and you accomplish very little. Push in rhythm with the swing and its motion grows. That is resonance: a system responds strongly when driven near one of its natural frequencies.

Here's a real demonstration of spatial vibration patterns:

![Sand collecting along the stationary nodes of a Chladni plate vibrating at 5.289 kHz](https://upload.wikimedia.org/wikipedia/commons/0/03/Round_Chladni_plate_with_3_circular_and_4_linear_nodes.jpg)

*Photograph: Pieter Kuiper, public domain, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Round_Chladni_plate_with_3_circular_and_4_linear_nodes.jpg). The sand reveals places on the plate that barely move. The shapes change when the vibration mode changes. This isn't magic; it's the kind of physics I want magic to borrow.*

Now treat one responsive structure inside a crystal as a tiny mass attached to a spring. It has a displacement `q` from its resting position. Newton's second law says force equals mass times acceleration:

```text
F = ma = m q̈
```

A spring pulls the mass back toward rest with force `−kq`. Because `k = mω₀²`, where `ω₀` is the natural angular frequency, we can write:

```text
m q̈ + mω₀²q = 0
```

Nothing magical yet: this is an ordinary oscillator. Now let a thaumic wave exert a driving force. Suppose the local wave varies as `φ(t) = Φ cos(ωt)`, and the structure couples to it with strength `g`:

```text
m q̈ + mω₀²q = gΦ cos(ωt)
```

Real oscillators also lose organized energy through friction, internal vibrations, or other processes. Model this **damping** with `2mγ q̇`, where `γ` controls how quickly motion dies out:

```text
m q̈ + 2mγ q̇ + mω₀²q = gΦ cos(ωt)
```

Every term has a job: inertia, damping, restoring force, and magical driving force. Solving for the steady oscillation gives its amplitude:

```text
A(ω) = |g|Φ / [m √((ω₀² − ω²)² + 4γ²ω²)]
```

The important part is the denominator. When the driving frequency `ω` gets close to the natural frequency `ω₀`, the first squared term becomes small, so the response grows. Damping prevents the result from becoming infinite. Strictly, the peak in displacement is slightly below `ω₀` when damping isn't negligible.

This is how I want **magical materials** to work. A crystal needn't contain a special category of “ice magic.” Its structure might simply have a strong thaumic response at frequencies useful for extracting energy from certain modes of matter. Different materials have different resonances and different coupling strengths.

That suggests a reason ancient incantations and ritual instruments could have worked: they helped a caster repeat a particular timing or stabilize a field pattern. Modern engineers would replace them with better resonators and controllers.

## What actually gets exchanged?

Resonance alone does not create heat, cold, motion, or life. It tells us **which systems respond**. We still need to track energy.

A moving object has kinetic energy. Our spring-like structure also stores potential energy. Together:

```text
Eosc = ½m(q̇)² + ½mω₀²q²
```

The first term measures energy of motion; the second measures energy stored in displacement. Multiply our damped oscillator equation by its velocity `q̇`, and the energy balance becomes:

```text
dEosc/dt = gφ q̇ − 2mγ(q̇)²
```

Read it from left to right:

- `dEosc/dt` is how fast the oscillator's energy changes.
- `gφ q̇` is the instantaneous power delivered by the thaumic field: force times velocity.
- `2mγ(q̇)²` is power lost from the organized oscillation into other degrees of freedom, often ending up as heat.

When the motion settles into a repeating cycle, its average stored energy stops changing. The average input power then equals the average dissipated power. With `q(t) = A cos(ωt − δ)` and the average of `sin²` over a cycle equal to `1/2`, we get:

```text
⟨Pabs⟩ = mγω²A²

       = g²Φ²γω² / [m((ω₀² − ω²)² + 4γ²ω²)]
```

This tells me why a particular substance heats strongly under one thaumic frequency but barely responds to another. It also says more field amplitude costs more energy: absorbed power scales with `Φ²` in this linear model. For the real oscillator mathematics behind this, see the [MIT spectroscopy notes](https://chem.libretexts.org/Ancillary_Materials/Laboratory_Experiments/Wet_Lab_Experiments/MIT_Labs/Lab_10%3A_Fundamentals_Of_Spectroscopy/1.2_-_Background).

**Pyromancy** could deposit energy into microscopic modes that thermalize into heat. **Cryomancy** is harder: it must remove energy and carry it somewhere else, perhaps using an actively driven process resembling refrigeration. These are not automatically mirror-image spells.

## Where does the energy come from?

Suppose a mage heats one kilogram of water from 20°C to 100°C. Ordinary thermodynamics gives:

```text
Q = mcΔT
  ≈ (1 kg)(4,180 J/kg·°C)(80°C)
  ≈ 334,400 J
```

That's roughly **334 kilojoules**, without accounting for losses or evaporation. The mage cannot just wish that energy into existence.

A consistent field model needs an energy budget for the field *and* matter. One way to obtain it is to start with a Lagrangian: a mathematical expression encoding a system's kinetic, potential, and interaction terms. In a simple idealized model, using units chosen so the field terms fit our wave equation:

```text
Lfield density = ½[(φ̇/cφ)² − |∇φ|² − μ²φ²]
Losc           = ½m(q̇)² − ½mω₀²q²
Lint           = gqφ  (at the oscillator's location)
```

The Euler–Lagrange equations applied to these expressions recover the undamped oscillator equation and the field equation, with a localized source `J = gq δ³(x − x₀)`. The symbol `δ³` simply means that this idealized oscillator is concentrated at position `x₀`.

The same model gives a total energy containing field energy, oscillator energy, **and interaction energy**:

```text
Etotal = Efield + Eosc − gqφ(x₀)

dEtotal/dt = 0    (closed, ideal system)
```

That final line is conservation of energy. If I include damping, I must also include the surrounding thermal or other systems receiving the lost energy. Otherwise I'd only be hiding energy loss inside a symbol.

Momentum must be conserved too. To lift a rock, a mage needs a mechanism that generates a directed force, and the field or another object must account for the opposing momentum. Our basic scalar oscillator model doesn't derive robust telekinesis yet; that remains unfinished physics.

The Thaumion therefore shouldn't be an unlimited battery. It might control a transfer while most of the energy comes from fuel, a charged device, or an external reservoir. That distinguishes a talented **controller** from a powerful **energy source**—a useful distinction for both stories and game mechanics.

## Is this quantum field theory?

Not yet. Everything above is a **classical field model**. Quantum field theory would promote `φ` to a quantum field operator and describe its excitations as particles. I could call the hypothetical quantum a **thaumon**. For a relativistic free scalar field, its particle energy would obey:

```text
E² = p²c² + mφ²c⁴
```

Here `p` is momentum and `mφ` is the thaumon's mass. If the field's propagation respects ordinary relativity, `μ = mφc/ℏ`, with `ℏ` being the reduced Planck constant. Quantum transitions would then involve energy differences such as `ΔE = ℏω`.

None of that automatically explains healing, levitation, or a biological transmitter. Quantizing a field does not grant it arbitrary abilities. I'd still have to specify *which particles it couples to*, *how those couplings work*, and *what organized structures can do with them*. That is the difference between writing physics-shaped symbols and actually constructing a theory.

## So where do the schools of magic come from?

Once the microscopic rules are fixed, the traditional schools become **engineering disciplines**, not separate supernatural powers.

- **Pyromancy:** transfer energy into matter, often through modes that turn it into heat.
- **Cryomancy:** extract thermal energy and deliver it to a field or external sink.
- **Telekinesis:** generate a controlled force and account for momentum; still needs a stronger interaction model.
- **Electromancy:** selectively manipulate charged matter to produce currents or discharges; that selectivity is not yet derived.
- **Alchemy:** restructure molecules or materials, constrained by chemistry and available energy.
- **Healing:** coordinate huge numbers of microscopic processes using accurate biological information, not merely raw power.
- **Enchantment:** engineer materials that respond predictably or retain controlled field configurations.

Healing might be much harder than causing an explosion. An explosion mostly demands energy delivered in the wrong place; repairing a nerve demands knowledge of precisely what belongs where. That difference feels far more meaningful than assigning spells arbitrary levels.

## The modern magical world probably looks mundane

If magic existed for thousands of years, its history wouldn't follow ours with some wizard towers added. Cheap thaumic lifting might delay crane development. Reliable magical lighting might reduce incentives to invent some electrical lighting systems. Other discoveries—communications, materials, medicine—might arrive earlier.

Eventually the economics would win. If a mechanical hinge is cheaper than an enchanted hinge, people would use the mechanical one. If a factory can reproduce a spell more reliably than a trained human, the factory replaces the routine caster. A modern hospital's “healing magic” might look like a calibrated medical device.

There are still major questions I haven't answered: what carries thaumic charge, how a Thaumion produces spatially precise patterns, how the field exerts directional forces, and what ultimately supplies large amounts of energy. I don't want to pretend those gaps are solved.

But that's precisely what I enjoy about this approach. Instead of asking what cool spell to invent next, I have to ask **what the universe permits**, what it costs, and what generations of curious people would build from it.

A thousand years ago, someone might have called it sorcery. Today, they'd probably call technical support.
