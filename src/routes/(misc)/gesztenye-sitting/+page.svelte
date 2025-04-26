<script>
	import gesztenyePic from './images/gesztenye.jpg?enhanced';
	import ImportantBadge from './ImportantBadge.svelte';
	import ScrollToTop from './ScrollToTop.svelte';
	import dogPawLight from './dog-paw-light.svg';
	import dogPawDark from './dog-paw-dark.svg';
	import Meta from '$lib/components/Meta.svelte';
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
		<p>
			In the span of these couple hours, we'd like to ask you to <em
				>prevent house training accidents and supervise</em
			> the doggo, making sure he does not get into unwanted shenanigans. You, of course, also have the
			option to for some bonding time with him, if you want.
		</p>

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
			Unfortunately, <em> there isn't an easy tell</em> for when he has to go - at least not one we noticed.
			The following things might each point to him wanting to go outside for a pee. They are listed in
			increasing order of obviousness
		</p>
		<ul>
			<li>sniffs the floor a lot</li>
			<li>he stands in the hallway, between the rooms and looks at the entrance</li>
			<li>suddenly gets up from a lying position and does any of the above</li>
		</ul>

		<p>
			He regularly does the first two, so if you've recently been on a potty break (e.g. less than
			20 mins ago), you can fairly safely ignore it).
		</p>

		<h2 id="supervision">Supervision</h2>

		<p>
			The other part of the task you so graciously accepted revolves around managing <em
				>his safety and manners</em
			>. Managing safety revolves around making sure he does chew on wires or plants. His manners on
			the other hand are a longer list of things he is not allowed to do.
		</p>

		<p>Most important parts of home manners:</p>
		<ul>
			<li>not allowed on any furniture</li>
			<li>may not sleep outside his crate</li>
			<li>
				yes, in case he does fall asleep somewhere you have to wake him up and put him in his crate,
				as soon as possible
			</li>
			<li>no barking</li>
			<li>no jumping up on people</li>
			<li>no biting hands, furniture, clothing, hair</li>
		</ul>
		<h2 id="potty-breaks">Conducting a Potty Break</h2>

		<p>
			Potty breaks are very short and do not require you to actually walk the dog. When you take him
			downstairs, there is a small rectangle of wider sidewalk to the right after exiting. This is
			his potty area, so stand in that area until he wees. When he does, mark the behaviour with a
			"Yes", and once finished, give him a small treat.
		</p>

		<p>
			Once he's done, you can take him upstairs. Since you're watching him only for a couple of
			hours, he should not need to poo during this time. If you think he does, just take him for a
			slightly longer, slow walk until the <a
				href="https://www.google.com/maps/dir/Kandlgasse+8,+Neubau+1070+Wien,+Austria/Bandgasse+%26+Westbahnstra%C3%9Fe,+1070+Wien/@48.2023536,16.3444264,18z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x476d07f2b92e61c7:0x487c5fd7deb2bda8!2m2!1d16.3452153!2d48.202898!1m5!1m1!1s0x476d078d2d2183f5:0x5a872d17523cc94e!2m2!1d16.3459722!2d48.2018093!3e2?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D"
			>
				Bandgasse - Westbahnstraße corner</a
			> and back. That is his poo route, if he does not do it there, he probably does not need to.
		</p>
		<h2 id="crating">Crating and Sleep</h2>

		<p>
			Since he's a puppy, he sleeps <em>15-20 hours a day</em>. This basically means that for every
			hour he's awake and active, he can spend two sleeping. Unfortunately, <i>because</i> he's a puppy,
			he does not settle into sleep on his own, if there are other, more exciting things to do. So, you
			have two choices for his naps: either you comfortably settle onto the sofa, and ignore him, waiting
			for him to go into his crate on his own, or you send him in. Once he's inside you're free to praise
			him for it and close the door.
		</p>

		<p>
			Sending him in works by grabbing two treats from the go-bag, standing next to the crate,
			pointing to it and giving out the "Place" command. If it works, he will enter the crate and
			sit, and you should reward him with one of the treats. Then, as you're still crouching, close
			the crate door, and once closed, praise and reward again.
		</p>

		<p>
			He will look at with you sad puppy eyes when you do this, but be strong and ignore him. I
			promise you he does not hate you for it, he needs his sleep.
		</p>

		<p>
			If he ever gets restless in the crate, and whines or barks, interrupt him with a "No"
			immediately, even if you're in a completely different part of the flat. For example, Pisti
			often says "no", as he's on the toilet, while Gesztenye is in the crate and the dog starts
			whining.
		</p>

		<p>
			In case he enters the crate on its own, it means he's calm and would like some rest. Do not
			bother him in the crate, that's his space for me time. If you want, you can close the door on
			him, even if he's entered on his own.
		</p>
		<h2 id="water">Water</h2>

		<p>
			To manage his need for potty, it's advisable to not let him drink too much at once, as he can
			overdrink because of excitement and then he has to pee a lot. Make sure to have about <em>
				half a cup to a cup water
			</em> in his bowl, but not more. If he drinks it, only refill it after the next potty break.
		</p>
		<h2 id="play">Play</h2>

		<p>
			In case you want to play with him, the best game for tiring him out is <em>tug-of-war</em>. He
			has a rope, usually collected into his crate, so grab it from there. If he's not immediately
			interested, you can call him in a playful voice and wiggle the rope on the ground like a dying
			fish. This usually gets him interested enough to go for it, after which you can start playing
			tug with him.
		</p>

		<p>
			At some point, you'll start noticing him losing interest, so you can try and upping the ante.
			Sometimes though he is just tired, or you have had enough. If you either of you want to stop
			playing, you should interrupt the play by asking him for a "Sit" and taking away the toy into
			your hands. Once he's seated and has his gaze on you, you can put the toy in the front of him,
			say "Brake" and then start doing your own thing. Once you decided to interrupt the play, do
			not let him invite you back in, he will start <em>playing on his own</em>.
		</p>
		<h2 id="schedule">Schedule Recommendation</h2>

		<p>
			He will be fed when we hand him over to you, so you do not need to worry about feeding him. He
			will also most likely have just taken a walk. We will have about 10-15 minutes of overlap
			before we leave him with you. During this time, we'll calmly sit with you on the sofa, have a
			coffee and a chat, until he calms down a bit. After this, we will calmly put on our stuff and
			leave the dog with you.
		</p>

		<p>
			He will be a bit excited after this, so it's best if you call him to yourself, and if he's
			relatively calm, have a small bonding pet session. If he whines or barks, do not pet him, just
			interrupt it with a calm, confident "No". Otherwise, if you think he needs to expell some
			energy, you can try to play with him a little. In any case, 20-30 minutes after we leave, you
			should take him for a potty break.
		</p>

		<p>
			Once done with the potty, if you want to bond, you can play, wrestle or pet him for 5-10
			minutes. After this, you should probably crate him and allow him to sleep for at least 1.5-2
			hours. Remember by this point he's been awake for about an hour, so the downtime is welcome.
			During this time, feel free to move around the flat, watch some TV, read or use the office. In
			general, make yourself at home.
		</p>

		<p>
			After this nap, pull him out of the crate, go for a potty break again. Once upstairs, let him
			play on his own outside the crate for 30 minutes, and he will usually enter the crate on his
			own and settle. By this point there should not be a lot of time left until we get back home,
			so you should do some mixture of the following activites: - potty breaks as needed - give him
			a Kong (see below) - playing together - free roam time for hime - pets, there are never enough
			pets
		</p>
		<h2 id="kongs">Kongs</h2>
		<p>
			if he isn't tired at the moment, but you want some time for yourself, without needing to focus
			on him, there is a frozen Kong toy in the bottom drawer of the freezer. Lure him into the
			crate with it and close the door on him. He will be focused on getting the treats out of that
			thing, which will provide him some stimulation, allowing him to settle afterwards. This gives
			you about an hour to do anything, even if he does not fall asleep. If he does fall asleep
			afterwards, he will be out for a while.
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
				There is a mason jar in the bathroom, with a greenish clear liquid. That is a pee cleaning
				solution. Take two microfiber cloths from the bath, dip one in the cleaning liquid, leave
				the other one dry.
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
			<li>Rinse and wring the two cleaning cloths, placing them on the side of the bath to dry.</li>
			<li>
				Final step: be proud of the quick solution and relax for a while. Now at least he won't have
				to pee for a while.
			</li>
		</ol>

		<h2 id="motivation">Motivating Different Behaviors</h2>

		<p>
			The go-bag has a good amount of treats in it. For training reasons, we would like to kindly
			ask you to not feed him from those, unless the situation heavily calls for it. Such cases are
			when you went to the café and need to manage his attention, or you need to place him in his
			crate and he is not willing.
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
		<p>
			There are a few other items too, but you shouldn't use those for this short a sitting: - high
			value treats - ball - long line
		</p>
		<h2 id="commands">Commands</h2>

		<p>
			The only commands you should need for this short time are: - "Sit" - put yo' butt on the
			ground - "Place" and point to crate - go to the crate. currently, usually only works with
			treats - "Stay" - best to give when he's seated, he will try to maintain the sit. Not awfully
			stable at the moment, distraction can easily make it fall apart. - "Break" - you can stop
			staying, go do whatever you want now
		</p>
	</div>
</main>

<style>
	:global(body) {
		background-color: #f0f7f4;
	}

	main {
		color: #5079a5;
		padding-block: 2rem;
		font-family: 'Noto Sans';
		padding-inline: 1rem;
		line-height: 1.6;
		--accent-color: #dd7373;
	}

	.container {
		max-width: 720px;
	}

	h1,
	h2 {
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
