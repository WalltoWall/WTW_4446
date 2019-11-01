# Slices

In Prismic, Slices are reusable custom components defined in the CMS with
specific content fields. Slices can be stacked and re-ordered on-the-fly as
needed. Individual pages can be constructed using these reusable components to
create unique layouts.

Think of them as Lego blocks for websites.

With this technique, traditional CMS functionality with multiple templates, one
for each page type, becomes unnecessary. Instead, a single template with logic
to render Slices as requested can be used. This reduces technical debt since
each block of content has a single source of functionality and styling.

Slices are componentized so individual slices can be made in isolation from
eachother. When necessary, slices can provide contextual information to other
slices and change as needed.

For more technical information on Prismic Slices, read Prismic's [official
Slices documentation][slices-docs].

For instructions on creating a Slice, read the
[Create a Slice](guide-create-a-slice.md) guide.

## Determining the Slice's purpose

Before writing code, a proper understanding of the Slice's purpose must exist.
Slices are typically horizontal content areas of a page that should be reusable
on any page (with the exception of visual design incompatibility).

The following questions come to mind:

**How will the slice act with other types of slices above and below it?**

Slices may need to interact with adjacent slices. For example, elements may
stylistically extend outside the Slice's container and overlap content above or
below. Or the slice may need to include a top border if it follows a Slice of
the same type.

**What kind of stylistic variations will this slice have?**

Different pages may require slight tweaks to the coloring or positioning of the
Slice's elements. Providing different "styles" or "themes" selectable in the CMS
can help in this case.

Minimizing the number of variations makes development easier and causes less
confusion for clients. If you find yourself making a large amount of variations,
consider breaking the Slice into multiple Slices with distinct names.

**Will this slice be reused anywhere else?**

If the answer to this question is no, a traditional Slice may not be the best
fit. Instead, a project could contain an "unconfigurable" Slice that allows the
user to select from a list of pre-defined components to insert in that Slice's
position. This Slice would see the component selected and insert it directly
without any custom data from the CMS.

Alternatively, a page override could be used to inject a slice that only exists
programatically and not in Prismic. See
[Overriding Pages and Slices](guide-overriding-pages-and-slices.md) for more
details.

[slices-docs]:
  https://user-guides.prismic.io/content-modeling-and-custom-types/field-reference/slices
