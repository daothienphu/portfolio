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

Now imagine there's another field filling all of space. I'm calling it the **thaumic field**, and writing it as:

$$
\varphi(x, t)
$$

Read that as "the value of phi at position $x$ and time $t$". $x$ is a location in 3D space, $t$ is time. The value can change when something disturbs the field, kind of like a pond's surface when you throw a stone in. (The field isn't literally water, ripples are just a nice way to picture how a disturbance spreads.)

To start, I want the smallest model possible: **one number per point**, a scalar field. Later on I'll probably need a vector field to make telekinesis and directional forces work properly, but that's a future-me problem.

## How would a magical pulse travel?

Before writing any field equation, think about a vibrating string. When one bit of the string gets disturbed, it pulls on its neighbors, and the disturbance travels down the string. Two things matter here: how the string changes *over time*, and how its shape changes *from place to place*.

The simple 1D wave equation looks like this:

$$
\frac{1}{v^2}\frac{\partial^2 \varphi}{\partial t^2} - \frac{\partial^2 \varphi}{\partial x^2} = 0
$$

It looks scarier than it is, I promise:

- $\partial^2\varphi/\partial t^2$ is how fast the field's rate of change is itself changing over time. Basically acceleration.
- $\partial^2\varphi/\partial x^2$ is the curvature of the field across space, so whether one spot sits above or below its neighbors.
- $v$ is how fast the disturbance travels.
- $= 0$ means it's a disturbance moving freely, with nothing pushing on it from outside.

Real space has 3 dimensions though, so I swap the single space term for a **Laplacian**, $\nabla^2\varphi$, which measures curvature in all 3 directions. Then I add a source, plus one extra parameter that can make the field's static influence short-ranged:

$$
\frac{1}{c_\varphi^2}\frac{\partial^2 \varphi}{\partial t^2} - \nabla^2\varphi + \mu^2\varphi = J
$$

This is a sourced Klein–Gordon-type equation, used **classically** here. $c_\varphi$ is how fast the field propagates, $\mu$ is an inverse-length parameter, and $J$ says where matter is driving the field. If $\mu = 0$ you get a plain massless wave equation. If $\mu > 0$, the static influence of a localized source usually fades exponentially over a distance of about $1/\mu$.

To keep things friendly with relativity, I'd set $c_\varphi$ equal to the speed of light, at least until I have a reason not to.

And the world building payoff shows up right away: a spell has a **travel time**, and how well it works can depend on **range**. No arbitrary numbers in a rulebook needed.

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

Now take one responsive structure inside a crystal and treat it like a tiny mass on a spring. It's pushed some distance $q$ away from where it normally rests. Newton's second law says force equals mass times acceleration:

$$
F = ma = m\ddot{q}
$$

The spring pulls the mass back toward rest with a force of $-kq$. Since $k = m\omega_0^2$, where $\omega_0$ is the natural angular frequency, we get:

$$
m\ddot{q} + m\omega_0^2 q = 0
$$

Nothing magical so far, that's just a normal oscillator. Now let a thaumic wave push on it. Say the local wave goes like $\varphi(t) = \Phi\cos(\omega t)$, and the structure couples to it with strength $g$:

$$
m\ddot{q} + m\omega_0^2 q = g\Phi\cos(\omega t)
$$

Real oscillators also lose organized energy, through friction, internal vibrations, whatever. That's **damping**, and I model it with $2m\gamma\dot{q}$, where $\gamma$ controls how fast the motion dies out:

$$
m\ddot{q} + 2m\gamma\dot{q} + m\omega_0^2 q = g\Phi\cos(\omega t)
$$

Every term has a job here: inertia, damping, the restoring force, and the magical driving force. Solve for the steady oscillation and you get its amplitude:

$$
A(\omega) = \frac{|g|\Phi}{m\sqrt{(\omega_0^2 - \omega^2)^2 + 4\gamma^2\omega^2}}
$$

The bit to look at is the bottom. When the driving frequency $\omega$ gets close to the natural frequency $\omega_0$, the first squared term gets small, so the response gets big. Damping is what stops it from going to infinity. (Technically, when damping isn't tiny, the peak in displacement sits slightly below $\omega_0$, for the pedants.)

This is how I want **magical materials** to work. A crystal doesn't need some special "ice magic" category inside it. Its structure might just respond strongly at frequencies that happen to be good for pulling energy out of certain modes of matter. Different materials, different resonances, different coupling strengths.

And that gives a reason ancient incantations and ritual instruments could've actually worked: they helped a caster repeat a specific timing, or keep a field pattern stable. Modern engineers would just replace them with better resonators and controllers. Less chanting, more knobs.

## What actually gets exchanged?

Resonance on its own doesn't make heat, cold, motion, or life. It only tells us **which systems react**. We still have to keep track of energy.

A moving thing has kinetic energy, and our spring-like structure also stores potential energy. Put them together:

$$
E_{\text{osc}} = \tfrac{1}{2}m\dot{q}^2 + \tfrac{1}{2}m\omega_0^2 q^2
$$

The first term is energy of motion, the second is energy stored in being displaced. Multiply the damped oscillator equation by its velocity $\dot{q}$, and the energy balance comes out as:

$$
\frac{dE_{\text{osc}}}{dt} = g\varphi\dot{q} - 2m\gamma\dot{q}^2
$$

Reading left to right:

- $dE_{\text{osc}}/dt$ is how fast the oscillator's energy is changing.
- $g\varphi\dot{q}$ is the power the thaumic field is delivering right now, force times velocity.
- $2m\gamma\dot{q}^2$ is power leaking out of the organized oscillation into other places, usually ending up as heat.

Once the motion settles into a repeating cycle, its average stored energy stops changing, so the average power going in equals the average power being lost. With $q(t) = A\cos(\omega t - \delta)$, and the average of $\sin^2$ over a cycle being $1/2$, we get:

$$
\langle P_{\text{abs}} \rangle = m\gamma\omega^2 A^2 = \frac{g^2\Phi^2\gamma\omega^2}{m\left[(\omega_0^2 - \omega^2)^2 + 4\gamma^2\omega^2\right]}
$$

So this tells me why one substance heats up a lot under one thaumic frequency but barely reacts to another. It also says a bigger field amplitude costs more energy: in this linear model, absorbed power goes up with $\Phi^2$. If you want the real oscillator math behind this, the [MIT spectroscopy notes](https://chem.libretexts.org/Ancillary_Materials/Laboratory_Experiments/Wet_Lab_Experiments/MIT_Labs/Lab_10%3A_Fundamentals_Of_Spectroscopy/1.2_-_Background) cover it.

**Pyromancy** could dump energy into tiny modes that turn into heat. **Cryomancy** is harder: it has to pull energy out and carry it somewhere else, maybe with some actively driven process that works kind of like a fridge. So fire and ice are not automatically mirror-image spells, which I think is a cool consequence.

## Where does the energy come from?

Say a mage heats 1 kilogram of water from 20°C to 100°C. Regular thermodynamics says:

$$
Q = mc\Delta T \approx (1\ \text{kg})(4{,}180\ \text{J/kg·°C})(80\ \text{°C}) \approx 334{,}400\ \text{J}
$$

That's about **334 kilojoules**, before counting any losses or evaporation. The mage can't just wish that energy into existence.

A consistent field model needs an energy budget for the field *and* the matter. One way to get there is to start with a Lagrangian, which is a math expression that packs a system's kinetic, potential, and interaction terms together. In a simple idealized model, with units picked so the field terms match our wave equation:

$$
\mathcal{L}_{\text{field}} = \tfrac{1}{2}\left[\left(\frac{\dot{\varphi}}{c_\varphi}\right)^2 - |\nabla\varphi|^2 - \mu^2\varphi^2\right]
$$

$$
L_{\text{osc}} = \tfrac{1}{2}m\dot{q}^2 - \tfrac{1}{2}m\omega_0^2 q^2
$$

$$
L_{\text{int}} = g\,q\,\varphi \quad \text{(at the oscillator's location)}
$$

Run these through the Euler–Lagrange equations and you get back the undamped oscillator equation and the field equation, with a localized source $J = g\,q\,\delta^3(x - x_0)$. The $\delta^3$ just means this idealized oscillator lives at a single point, $x_0$.

The same model gives a total energy that includes field energy, oscillator energy, **and interaction energy**:

$$
E_{\text{total}} = E_{\text{field}} + E_{\text{osc}} - g\,q\,\varphi(x_0)
$$

$$
\frac{dE_{\text{total}}}{dt} = 0 \quad \text{(closed, ideal system)}
$$

That last line is conservation of energy. If I add damping back in, I also have to include whatever thermal (or other) system is receiving the lost energy. Otherwise I'm just hiding energy loss inside a symbol and calling it a day.

Momentum has to be conserved too. To lift a rock, a mage needs some mechanism that makes a directed force, and the field or something else has to take the opposite momentum. My basic scalar oscillator model doesn't give solid telekinesis yet, so that's still unfinished physics.

So the Thaumion shouldn't be an infinite battery. It might *control* a transfer, while most of the actual energy comes from fuel, a charged device, or some outside reservoir. That splits a talented **controller** from a powerful **energy source**, which is a really useful distinction for both stories and game mechanics.

## Is this quantum field theory?

Not yet, no. Everything so far is a **classical field model**. Quantum field theory would turn $\varphi$ into a quantum field operator and describe its excitations as particles. I could call that hypothetical particle a **thaumon**. For a relativistic free scalar field, its energy would follow:

$$
E^2 = p^2c^2 + m_\varphi^2 c^4
$$

$p$ is momentum and $m_\varphi$ is the thaumon's mass. If the field plays by normal relativity, then $\mu = m_\varphi c/\hbar$, where $\hbar$ is the reduced Planck constant. Quantum transitions would then involve energy differences like $\Delta E = \hbar\omega$.

But none of that magically (heh) explains healing, levitation, or a biological transmitter. Quantizing a field doesn't give it whatever powers you want. I'd still need to say *which particles it couples to*, *how those couplings work*, and *what organized structures can do with them*. That's the difference between writing physics-looking symbols and actually building a theory.

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
