<footer>
	<nav class="socials section">
		<h2>Socials</h2>
		<ul>
			<li>
				<a href="https://github.com/korompaiistvan">GitHub</a>
			</li>
			<li>
				<a href="https://bsky.app/profile/kpisti.bsky.social">BlueSky</a>
			</li>
			<li>
				<a href="https://www.linkedin.com/in/istvankorompai/">LinkedIn</a>
			</li>
		</ul>
	</nav>
	<div class="section contact">
		<h2>Contact</h2>
		<p>istvan.korompai@hey.com</p>
	</div>
</footer>

<style>
	footer {
		margin-top: calc(2 * var(--bg-grid-size));
		padding-top: calc(0.5 * var(--bg-grid-size));
		border-top: 1px solid currentColor;
		display: flex;
		justify-content: space-between;
	}

	h2 {
		font-size: large;
		font-weight: 500;
		margin-bottom: calc(0.25 * var(--bg-grid-size));
	}

	ul {
		list-style: none;
		padding: unset;
		margin: unset;
	}

	a {
		text-decoration: none;
		color: unset;
	}

	.section.contact {
		text-align: right;
	}
</style>
