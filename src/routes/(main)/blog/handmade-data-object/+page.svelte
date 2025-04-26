<script lang="ts">
	import Body from '$lib/components/blog/Body.svelte';
	import Divider from '$lib/components/blog/Divider.svelte';
	import Header from '$lib/components/Header.svelte';
	import Image from '$lib/components/blog/Image.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import Title from '$lib/components/blog/Title.svelte';
	import overheadPic from './images/overhead.png?enhanced';
	// @ts-expect-error the url params are not currently recognized by ts for nehanced img in svelte
	import whitePic from './images/white-face.jpg?enhanced&aspect=16:9';
	import digitalProtoPic from './images/digital-prototype.png?enhanced';
	import hunchbacksPic from './images/teamwork.jpg?enhanced';
	import partsPic from './images/lots-of-parts.jpg?enhanced';
	import meta from './meta';
</script>

<Header>
	<Meta {...meta} thumbnail={meta.thumbnail.img.src} />
	<Title title={meta.title} />
	<p class="collab">
		Collaboration with <span class="author-name">Tamás Varga</span> &
		<span class="author-name">Júlia Borsi</span>
	</p>

	<Image
		src={whitePic}
		alt="Closeup of the finished work, showing the dial around which the afternoon is visualized. The watch face is white and has a modern look with bold black and tiny blue numbering. At the part denoting 12 PM to 1 PM there are 9 brass gears next to each other showing that the authors have fun in their lunchtime together."
	/>
</Header>

<Body>
	<p>
		This project was a collaboration with some of my favourite colleagues in the Starschema data
		visualization team. We wrote about its story in more detail for the <a
			href="https://nightingaledvs.com/whats-a-handmade-data-object-anyway/">Nightingale</a
		>, so this is a shortened version, with an additional section on the digital prototype sprinkled
		in.
	</p>
	<Divider />
	<h2>Answering the challenge</h2>
	<p>
		The first edition of the Nightingale print magazine for the data visualization field posted the
		Dear Nightingale challenge, calling for unique analog approaches to data visualization. We chose
		to visualize our daily routines using old watch parts.
	</p>

	<Image
		src={partsPic}
		alt="Old, metal watch parts roughly organized into small heaps by type. There are crowns, balance wheels, hands, movements, bracelets, pins, glass covers, circular springs in bunches, one type of part mixing with the next while still forming distinct clusters."
	/>
	<p>
		After a rough accounting for how we spend our time, we divided the day's activities into
		categories of sleep, commute, paid work, unpaid work and fun. We then used the watch parts we
		were gifted by Julcsi's father, to map them out on paper. We chose a circular format, with
		different types of pieces representing the specific categories and then simply glued the pieces
		onto the paper.
	</p>
	<h2>The digital prototype</h2>
	<Image
		src={digitalProtoPic}
		alt="Screenshot of the digital prototype. On the left hand 3 sliders that control the layout of the a digital representation of the data object, which can be seen on the right hand side of the screen"
	/>
	<p>
		To make sure we didn't have to reglue hundreds of little bits in case we did not like the end
		result once we were done, I created a digital prototype for the layout. This was a fairly simple
		Svelte app with barely any styling, but with accurate scale for the watch faces and parts that
		we wanted to use. I then created a few sliders so we had an easy way of trying out different
		spacing options.
	</p>
	<p>
		Once we had this tool, we figured out the best layout fairly quickly, so we simply exported the
		SVG from the digital prototype and created a simplified template from it. We then printed that
		on the piece of paper to serve as a guide when gluing the parts on. After that it was just like
		assembling IKEA furniture: tedious, slightly too long, but fun because we were amongst friends.
	</p>
	<Image
		src={overheadPic}
		alt="Overhead shot showing two watch faces situated to the left and right of the middle of a sheet of paper. Around both faces run three circles of five types of watch parts corresponding to different activities. Handwritten annotations help to discern the meaning of each part, highlighting differences between the authors’ days, like how “unpaid work” for Tomi means getting up at night for his children, while for Julcsi it’s studying Japanese and for Pisti it’s cooking."
	/>
	<h2>Learnings</h2>
	<p>
		I think many practicioners who normally work with digital tools and then do something physical
		and permanent - at least more so than these bits on a piece of silicon - get rejuvenated and
		learn to appreciate the beauty of irreversible mistakes more. Just like them, we also enjoyed
		this excursion to physicalization.
	</p>
	<Image
		src={hunchbacksPic}
		alt="Wide shot of the three authors working on the piece around a table in an office setting. All of them are slightly hunched, focused on the tiny parts they are gluing together and onto the paper. The other chairs and workstations in the office space are empty."
	/>
</Body>

<style>
	.collab {
		font-size: small;
	}
	.author-name {
		font-weight: 500;
	}
</style>
