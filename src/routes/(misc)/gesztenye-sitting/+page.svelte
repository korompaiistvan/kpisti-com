<script lang="ts">
	import gesztenyePic from './images/gesztenye.jpg?enhanced';
	import ImportantBadge from './ImportantBadge.svelte';
	import ScrollToTop from './ScrollToTop.svelte';
	import dogPawLight from './dog-paw-light.svg';
	import dogPawDark from './dog-paw-dark.svg';
	import Meta from '$lib/components/Meta.svelte';
	import PeriodSwitch from './PeriodSwitch.svelte';
	import type { PeriodOption } from './PeriodSwitch.svelte';

	let period: PeriodOption = $state('hours'); // Default value for the period switch

	// persist the period value in local storage

	$effect(() => {
		if (typeof window !== 'undefined') {
			const storedPeriod = localStorage.getItem('gesztenye-sitting-period');
			if (storedPeriod) {
				period = storedPeriod as PeriodOption;
			}
		}
	});

	$effect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('gesztenye-sitting-period', period);
		}
	});
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Karla&family=Noto+Sans" rel="stylesheet" />
	<link href={dogPawLight} rel="icon" media="(prefers-color-scheme: light)" />
	<link href={dogPawDark} rel="icon" media="(prefers-color-scheme: dark)" />
</svelte:head>
<Meta
	description="A short description on how to care for the world's cutest landshark"
	title="Sitting Gesztenye"
	thumbnail={`https://kpisti.com/${gesztenyePic.img.src}`}
/>
<main>
	<div class="container">
		<h1>Sitting Gesztenye</h1>
		<ScrollToTop scrollToId="toc" />
		<enhanced:img
			class="hero"
			src={gesztenyePic}
			alt="Portrait of the most beautiful vizsla baby on the planet. Unbiased opinion"
		/>
		<PeriodSwitch bind:value={period} />
		{#if period === 'hours'}
			<p>
				Thank you for taking care of our little landshark, Gesztenye, for a couple of hours. We hope
				you will enjoy the time spent with him.
			</p>
		{:else if period === 'day'}
			<p>
				Thank you for taking care of our little landshark, Gesztenye, for a day or two. We hope you
				will enjoy the time spent with him.
			</p>
		{:else if period === 'days'}
			<p>
				Thank you for taking care of our little landshark, Gesztenye, for multiple days. We hope you
				will enjoy the time spent with him.
			</p>
		{/if}

		<p>
			Below is a bunch of info, the most important ones to read have been marked. The rest are
			completely optional but can come in handy in case we are unreachable. They are roughly in
			decreasing order of importance.
		</p>

		<nav class="table-contents" id="toc">
			<h2>Table of Contents</h2>
			<ul>
				<li>
					<a href="#managing-potty">Managing Potty</a>
					<ImportantBadge />
				</li>
				<li>
					<a href="#supervision">Supervision</a>
					<ImportantBadge />
				</li>
				{#if period !== 'hours'}
					<li>
						<a href="#daily-schedule">Daily Schedule</a>
						<ImportantBadge />
					</li>
				{/if}
				<li>
					<a href="#potty-breaks">Potty Breaks</a>
				</li>
				<li>
					<a href="#crating">Crating and Sleep</a>
				</li>
				<li>
					<a href="#water">Water</a>
				</li>
				<li>
					<a href="#play">Play</a>
				</li>
				<li>
					<a href="#schedule">Schedule Recommendation</a>
				</li>
				<li>
					<a href="#kongs">Kongs</a>
				</li>
				<li>
					<a href="#potty-accidents">Potty Accidents</a>
				</li>
				<li>
					<a href="#motivation">Motivation for Behaviours</a>
				</li>
				<li>
					<a href="#go-bag">The "Go Bag"</a>
				</li>
				<li>
					<a href="#commands">Commands</a>
				</li>
			</ul>
		</nav>

		<h2 id="managing-potty">Managing potty</h2>

		<p>
			Gesztenye can hold his bladder for up to 8 hours if he's resting, but can lose control of it
			when excited. This requires a bit of <em>time management around his potty breaks </em>. Things
			that limit his bladder control, shortening the time between required potty breaks are:
		</p>
		<ul>
			<li>drinking</li>
			<li>eating</li>
			<li>play</li>
			<li>intense enjoyment, after e.g. a thorough petting</li>
			<li>training</li>
		</ul>
		<p>
			Lately he's been more reliable in telling us when he needs to go out, but <em>
				he does not yet have a very clear tell</em
			>. The following things might each point to him wanting to go outside for a pee. They are
			listed in increasing order of obviousness
		</p>
		<ul>
			<li>sniffs the floor a lot</li>
			<li>he stands in the hallway, between the rooms and looks at the entrance</li>
			<li>suddenly gets up from a lying position and does any of the above</li>
		</ul>

		<p>
			He regularly does the first two, so if you've recently been on a potty break (e.g. less than
			20 mins ago), you can fairly safely ignore it.
		</p>

		<h2 id="supervision">Supervision</h2>

		<p>
			The other part of the task you so graciously accepted revolves around managing <em
				>his safety and manners</em
			>. Managing safety simply means making sure he does chew on wires or plants. His manners on
			the other hand are a longer list of things he is not allowed to do.
		</p>

		<p>Most important parts of home manners:</p>
		<ul>
			<li>not allowed on any furniture</li>
			<li>no barking</li>
			<li>no jumping up on people</li>
			<li>no biting hands, furniture, clothing, hair</li>
		</ul>
		<h2 id="potty-breaks">Conducting a Potty Break</h2>

		<p>
			Potty breaks are very short and do not require you to actually walk the dog. When you take him
			downstairs, we usually wait with him just outside of the entrance for him to go in a little
			potty area. When he does, mark the behaviour with a "Yes", and once finished, give him a small
			treat. Once he's done, you can take him upstairs immediately if you'd like.
		</p>

		<p>
			{#if period === 'hours'}
				Since you're watching him only for a couple of hours, he should not need to poo during this
				time. If you think he does, just take him for a slightly longer, slow walk around the block,
				and he will most likely do it in a couple minutes of walking.
			{:else}
				He poops around 2-5 times a day, and usually within the first 5-10 minutes of the walk - to
				see when his usual poop times are just go to the <a href="daily-schedule"
					>daily schedule section</a
				>. If he does not do it during this time, you do not need to force it, he will do it later.
			{/if}
		</p>
		<h2 id="crating">Crating and Sleep</h2>

		<p>
			Since he's still a young teenager, he sleeps <em>15-20 hours a day</em>. This basically means
			that for every hour he's awake and active, he can spend two sleeping. Unfortunately,
			<i>because</i> he's a puppy, he does not always settle into sleep on his own, if there are other,
			more exciting things to do. So, you have two choices for his naps: either you comfortably settle
			onto the sofa, and ignore him, waiting for him to go into his bed/crate on his own, or you send
			him in. Once he's inside you're free to praise him for it and close the crate door - when crating.
		</p>

		<p>
			In case you have the crate available, you can crate him whenever you'd like. Thsi works by
			standing next to the crate - maybe with a treat - and using the command "Place" to indicate
			that he should go into the crate. If he does not immediately go in, you can lead him in by his
			collar. He will look at with you sad puppy eyes when you do this, but be strong and ignore
			him. I promise you he does not hate you for it, he needs his sleep.
		</p>

		<p>
			If he ever gets restless in the crate, and whines or barks, interrupt him with a "No"
			immediately, even if you're in a completely different part of the flat. For example, Pisti
			often says "no", as he's on the toilet, while Gesztenye is in the crate and starts whining.
		</p>

		<p>
			In case he enters the crate/bed on its own, it means he's calm and would like some rest. Do
			not bother him in there, that's his space for some "me time". If you want, you can close the
			door on him, even if he's entered on his own.
		</p>

		<h2 id="water">Water</h2>

		<p>
			To manage his need for potty, it's advisable to not let him drink too much at once, as he can
			overdrink because of excitement or being hot and then he has to pee a lot. Make sure to have
			about <em> a cup water </em> in his bowl, but not more. If he drinks it, only refill it after the
			next potty break.
		</p>

		<p>
			On walks, or in the park, he wants to drink a lot to cool down, but he really will drink
			liters if allowed. Instead we usually wet his ears, hind legs and shoulders to cool him down,
			and only give him a little bit to drink from his foldable water bowl.
		</p>
		<h2 id="play">Play</h2>

		<p>
			In case you want to play with him, the best game for tiring him out is <em>tug-of-war</em>. He
			has a rope he loves. If he's not immediately interested, you can call him in a playful voice
			and wiggle the rope on the ground like a dying fish. This usually gets him interested enough
			to go for it, after which you can start playing tug with him.
		</p>

		<p>
			At some point, you'll start noticing him losing interest, so you can try and upping the ante.
			If either of you want to stop playing, you should interrupt the play by asking him to "Drop
			it" and to "Sit" and taking away the toy into your hands. Once he's seated and has his gaze on
			you, you can put the toy in the front of him, say "Break" and then start doing your own thing.
			Once you decided to interrupt the play, do not let him invite you back in, he will start <em
				>playing on his own</em
			>.
		</p>
		<h2 id="schedule">Schedule Recommendation</h2>

		<p>
			He will be fed when we hand him over to you, so you do not need to worry about feeding him. He
			will also most likely have just taken a walk. We will have about 10-15 minutes of overlap
			before we leave him with you. During this time, we'll calmly sit with you, have a chat, until
			he calms down a bit. After this, we will calmly put on our stuff and leave the dog with you.
		</p>

		<p>
			He will be a bit excited/anxious after this, so it's best if you call him to yourself, and if
			he's relatively calm, have a small bonding pet session. If he whines or barks, do not pet him,
			just interrupt it with a calm, confident "No". Otherwise, if you think he needs to expell some
			energy, you can try to play with him a little. In any case, 20-30 minutes after we leave, you
			should take him for a potty break - just in case.
		</p>

		<p>
			Once done with the potty, if you want to bond, you can play, wrestle or pet him for 5-10
			minutes. After this, you should probably crate him and allow him to sleep for at least 1.5-2
			hours. Remember by this point he's been awake for a couple hours, so the downtime is welcome.
		</p>

		{#if period === 'hours'}
			<p>
				After this nap, pull him out of the crate, go for a potty break again. Once upstairs, let
				him play on his own outside the crate for 30 minutes, and he will usually enter the crate on
				his own and settle. By this point there should not be a lot of time left until we get back
				home, so you should do some mixture of the following activites: - potty breaks as needed -
				give him a Kong (see below) - playing together - free roam time for hime - pets, there are
				never enough pets
			</p>
		{/if}

		{#if period !== 'hours'}
			<h2 id="daily-schedule">Daily Schedule</h2>

			<p>
				His daily schedule is not super tight and is mostly split between low-movement and
				high-movement days.
			</p>
			<h3>Low movement day</h3>
			<ul>
				<li>We wake up around 8:30-9:00</li>
				<li>Quick potty break for peeing only</li>
				<li>We have breakfast</li>
				<li>He has breakfast between 9:00-10:00 paired with a short training session</li>
				<li>Luca leaves, Pisti starts work or hangs out in the living room</li>
				<li>Gesztenye walks around and naps until 10:30-12:00</li>
				<li>Potty break with poop walk and a café visit around</li>
				<li>Naps, or individual play, sometimes a chew treat (bunny ears, bovine scalp)</li>
				<li>
					Afternoon playtime/training session/scent work. In general some mental stimulation for him
				</li>
				<li>Another potty break and walk around 15:00-16:00 - sometimes he poops here</li>
				<li>Nap until 18:00 when Luca arrives</li>
				<li>Potty-break around Luca's arrival</li>
				<li>Dinner between 19:00 and 21:00 - sometimes later if we are out</li>
				<li>Cuddles/brushing/bonding time</li>
				<li>He settles in his bed/crate around 22:00</li>
				<li>Last potty break just before our bedtime, usually around 23:00 - 23:30</li>
			</ul>

			<h3>High movement day</h3>
			<p>
				A high movement day follows the same feeding and sleep schedule but - some of - the potty
				breaks and afternoon training session are replaced by a hike, or dog park or any activity
				that includes physical exercise for him
			</p>
		{/if}
		<h2 id="kongs">Kongs</h2>
		<p>
			If he isn't tired at the moment, but you want some time for yourself, without needing to focus
			on him, you'll have access to a frozen Kong toy, either because you are at our place, or we
			brought one to you. Lure him into the crate with it (if you have the crate) and close the door
			on him. He will be focused on getting the treats out of that thing, which will provide him
			some stimulation, allowing him to settle afterwards. This gives you about an hour to do
			anything, even if he does not fall asleep. If he does fall asleep afterwards, he will be out
			for a while.
		</p>

		<h2 id="potty-accidents">Potty Accidents</h2>

		<p>
			In case he does have an accident in the flat, do not worry, it happens to us too. If you catch
			him doing it, just interrupt with a calm, confident "No". If you realise only afterwards that
			it happened, just mark its unwantedness with a simple, disappointed "Oops"/"Ah-ah"/"Ó jaj" and
			take the following steps.
		</p>
		<ol>
			<li>
				Get a training pad from the storage closet, open it up and lay it on the pee, absorbent side
				down. This will soak up the pee, giving you time to take the dog outside as quickly as
				possible
			</li>
			<li>Put on your shoes and coat first, and take the doggie "Go Bag"</li>
			<li>Put the leash on the dogs collar</li>
			<li>Don't forget your keys</li>
			<li>Go for a potty break</li>
			<li>
				When he pees outside during the potty break, reward him with a lot of praise and treats
			</li>
			<li>Once upstairs, prep to clean up the rest of the pee.</li>
			<li>
				There is a spray bottle we'll give you, with a greenish clear liquid. That is a pee cleaning
				solution. Take two microfiber cloths, spray one with the cleaning liquid, leave the other
				one dry.
			</li>
			<li>Go to the pee spot, with the two cloths.</li>
			<li>
				Fold up the training pad with absorbent side on the inside and place it to the side. The
				plastic lining should contain all the pee. If not, just take it to the trash now, before
				proceeding.
			</li>
			<li>
				Take the two cloths, clean up the spot with the wet one, before wiping dry with the other
				one.
			</li>
			<li>Put the dirty training pad in the trash</li>
			<li>Rinse and wring the two cleaning cloths, placing them out to dry.</li>
			<li>
				Final step: be proud of the quick solution and relax for a while. Now at least he won't have
				to pee for a while.
			</li>
		</ol>

		<h2 id="motivation">Motivating Different Behaviors</h2>

		<p>
			The go-bag has a good amount of treats in it, feel free to use them to motivate him to do
			things. The most important thing to remember is that he is a <em>food motivated</em> dog, so he
			will do things for treats. If you want him to do something, just show him the treat, and he will
			usually do it. If he does not, you can try to get his attention by wiggling the treat in front
			of his nose, and then ask him to do the thing you want. If he does it, praise him enthusiastically
			and give him the treat.
		</p>

		<p>
			On the other hand, the above guide has a bunch of things he is not allowed to do. You can
			divert them from these with corrections (verbal and physical). Verbal corrections are a
			simple, confident "no", while physical correction here simply refers to removal by force, and
			NOT physical punishment of any sort.
		</p>

		<p>
			These corrections are especially important during play. If you're playing with him and he does
			any of the above prohibited things, please correct him verbally and interrupt the play, by
			crossing your arms and turning away from him. You can resume play after he settles a bit. If
			he does the behaviour after continuation, interrupt the play again.
		</p>

		<h2 id="go-bag">The "Go Bag"</h2>

		<p>
			The colorful fanny pack, holds a couple essential things in case you need to take him for a
			walk. The only things you should need from there are: - poo bags - treats - human hygiene
			products (tissues, wet wipes, disinfectant gel)
		</p>

		<h2 id="commands">Commands</h2>
		<p>
			Here is the repertoire of commands he knows, and the ones we use most often. You can also use
			them to get him to do things, or to stop doing things.
		</p>
		<p>Essentials</p>
		<ul>
			<li>"Sit" - put yo' butt on the ground</li>
			<li>"Down" - lie down on the ground</li>
			<li>"Place" - go to your crate/bed</li>
			<li>"Stay" + show him your open palm - stay where you are</li>
			<li>"Drop it" - let go of the thing in your mouth</li>
			<li>"Leave it" - do not touch that thing</li>
			<li>"Komm" (the only german one) - come to me</li>
			<li>"No" - stop doing that thing</li>
			<li>"Yes" - you did the thing I wanted</li>
			<li>"Break" - you can do whatever you want now</li>
			<li>
				"Heel" + open palm by your side - walk by my side (does not work great outside yet,
				especially if he's amped)
			</li>
		</ul>
		<p>Fun things</p>
		<ul>
			<li>"Nose" + reach with two fingers - touch your nose to my fingers</li>
			<li>"Spin" + show the direction - turn around</li>
		</ul>
	</div>
</main>

<style>
	:global(body) {
		background-color: #f0f7f4;
		--primary-color: #5079a5;
		--accent-color: #dd7373;
	}

	main {
		color: var(--primary-color);
		padding-block: 2rem;
		font-family: 'Noto Sans';
		padding-inline: 1rem;
		line-height: 1.6;
	}

	.container {
		max-width: 720px;
	}

	h1,
	h2,
	h3 {
		font-style: italic;
		font-family: Karla;
		margin-bottom: 0.5em;
		margin-top: 1em;
	}

	h1 {
		font-size: 3rem;
		font-weight: 700;
	}

	h2 {
		font-size: 2rem;
		font-weight: 500;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: 400;
	}

	p {
		margin-block: 1em;
	}

	em {
		font-style: normal;
		font-weight: 900;
		color: var(--accent-color);
	}

	a {
		color: inherit;
		text-underline-offset: 2px;
		text-decoration-thickness: 3px;
	}

	.table-contents {
		border: 4px solid #5079a5;
		border-radius: 1rem;
		padding-inline: 1rem;
		padding-block: 1rem;
		margin-block: 2rem;

		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
		}

		li {
			margin-block: 0.5em;
		}

		h2 {
			margin-top: 0;
		}
	}

	.hero {
		width: 100%;
	}
</style>
