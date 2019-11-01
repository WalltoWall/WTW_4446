# Architecture

## SDD: Slice Driven Development

In Prismic, Slices are reusable custom components defined in the CMS with
specific content fields. Slices can be stacked and re-ordered on-the-fly as
needed. Individual pages can be constructed using these reusable components to
create unique layouts.

With this technique, traditional CMS functionality with multiple templates, one
for each page type, becomes unnecessary. Instead, a single template with logic
to render Slices as requested can be used. This reduces technical debt since
each block of content has a single source of functionality and styling.

Let's call this technique Slice Driven Development, or SDD for short.

For more information on thinking with Slices, read the
[Slices](concept-slices.md) concept document.

For instructions on creating a Slice, read the
[Create a Slice](guide-create-a-slice.md) guide.

For more technical information on Prismic Slices, read Prismic's [official
Slices documentation][slices-docs].

## SDD: System Driven Development

For our Gatsby sites, we use [`styled-system`][styled-system] as our CSS-in-JS
solution of choice. `styled-system` was selected because it enables us to style
components consistently, quickly, and responsively in an encapsulated manner.

By using `styled-system`, we reduce the technical debt and burden of CSS naming
conventions like BEM/OOCSS, and can prevent `styled-components` component-naming
difficulties like `<SecondaryNavItemsWrapper>` since we can now rely on semantic
generics.

`styled-system` encourages and rewards consistency since properties like colors
and spacing are all defined upfront. A hard-coded margin or color value is easy
to find and refactor to be a part of a reusable global theme object.

For more information on system-driven styling, read the
[Styling with Ease](guide-styling-with-ease.md) guide.

## SDD: Standards Driven Development

Okay, this one should really be called Convention Driven Development, but that
doesn't start with an S.

Sites built with Gatsby, Prismic, Netlify, and the rest of the tech stack
defined in [Tech Stack][tech-stack] should be developed similarly. By following
conventions between projects, we can reduce the cognitive load needed to jump
between them.

Before explaining the process and benefits of Standards Driven Development,
imagine a world where every web project was built using a different
architecture.

- **Project A**: Gulp, Sass, Jade, JSON
- **Project B**: Webpack, PostCSS, Pug, WordPress
- **Project C**: Gatsby, Styled Components, JSX, Prismic

Moving between projects would require huge mental context shifts and requires
you to have a deep understanding of each project's abstractions. Unfortunately,
all three of these technology stacks are real at Wall-to-Wall. In fact, this
only describes the JavaScript-based projects and leaves out the PHP and Ruby
based ones.

The architecture described in this document aims to solve this problem and
provide a sustainable strategy in two ways:

1. **Use community-defined frameworks**
2. **Abstract implementation details**

### Use community-defined frameworks

Project A's and B's architectures use Gulp and Webpack as task runners and
bundlers. Both require custom setups to produce production-ready assets. This
allows each project to have tailor-made solutions depending on its needs.

Because the solution is unique to the project, however, those not initially
involved with the development may have a hard time working on it. Each project
setup like such requires the developer to spend time loading the project's
architecture into his or her head.

To reduce the time spent parsing a project's architecture, projects can be built
using a universal framework. This means learning the general structure once and
applying that knowledge to each project that employs it.

We can stretch this idea further by not only using the same architecture between
projects, but also by using an architecture defined outside Wall-to-Wall.
Examples of this include [Ruby on Rails][ruby-on-rails], [Gatsby][gatsby], and
[Next.js][next-js]. This means new developers may already be familiar with the
framework from previous experience with it. It also means new development in the
framework itself happens without Wall-to-Wall's involvement. Passive
improvements!

We selected [Gatsby][gatsby] as our framework of choice for its tight
integration with [React][react] and focus on static sites.

### Abstract implementation details

By using a common architecture, implementation details can be abstracted. This
means removing code from a project that is present in others and making its
execution automatic or easier to perform.

By doing this, we can reduce a project to contain only project-specific code. We
can, for example, remove the code needed to generate pages from a CMS if every
project needs to perform the same action. When entering a new project, you would
only need to read code that directly influences the site's final product such as
styling or markup, not task runners or bundlers.

### Don't fall into the Standards trap

Required XKCD reading: [Standards][xkcd-standards].

Project C in the examples above is the architecture used in this project. It's
important to note that despite the reasonings listed above, it is just another
standard. When iterating on this architecture, or constructing a new one, keep
that XKCD comic in mind and understand the importance and necessity of existing
standards.

**Don't fall into the Standards trap!**

## SDD: Serverless Driven Development

Sites built with the stack defined in [Tech Stack][tech-stack] are commonly
referred to be using "serverless architecture", or the "JAMStack". In practice,
serverless refers to the utilization of decoupled _services_ to provide the
backend functionality for a site or application.

As an example, Prismic is a decoupled (headless) CMS that serves website content
through an API, instead of directly serving rendered pages. Since Prismic is a
hosted service, Wall-to-Wall no longer needs to manage the maitenance of a
traditional CMS like installing security updates or ensuring constant uptime
availability like we would with a self managed solution.

Serverless architecture allows us to _abstract the implementation details_ of
things like our CMS and hosting (Netlify) to only need to concern ourselves with
direct project-specific code.

[tech-stack]: concept-tech-stack.md
[gatsby]: https://www.gatsbyjs.org/
[styled-system]: https://styled-system.com/
[guide-styling-with-ease]: ./guide-styling-with-ease.md
[next-js]: https://nextjs.org/
[ruby-on-rails]: https://rubyonrails.org/
[react]: https://reactjs.org
[slices-docs]:
  https://user-guides.prismic.io/content-modeling-and-custom-types/field-reference/slices
[xkcd-standards]: https://xkcd.com/927/
