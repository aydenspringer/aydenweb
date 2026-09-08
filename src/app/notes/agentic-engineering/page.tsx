import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "The 4 Agentic Engineering Skills to Know",
  description:
    "How I understand context, containment, loop, and graph engineering, using my experience recreating Super Mario Bros. as an example.",
  alternates: {
    canonical: "https://aydenweb.com/notes/agentic-engineering",
  },
  openGraph: {
    title: "The 4 Agentic Engineering Skills to Know — Ayden Springer",
    description:
      "My notes on the information, permissions, testing, and coordination needed to work with coding agents.",
    url: "https://aydenweb.com/notes/agentic-engineering",
  },
  twitter: {
    title: "The 4 Agentic Engineering Skills to Know — Ayden Springer",
    description:
      "My notes on the information, permissions, testing, and coordination needed to work with coding agents.",
  },
};

export default function AgenticEngineeringPage() {
  return (
    <main className="min-h-full bg-(--color-bg)">
      {/* Header */}
      <FadeIn>
        <section className="mx-auto w-full max-w-4xl px-6 pt-8 pb-12 md:px-12 md:pt-12 md:pb-16 lg:px-0">
          <Link
            href="/"
            className="font-body mb-8 flex w-fit items-center gap-2 text-sm font-medium text-(--color-link) hover:underline"
          >
            <ArrowLeft size={14} /> Home
          </Link>

          <p className="font-body mb-4 text-[13px] font-medium tracking-[0.08em] text-(--color-muted) uppercase">
            Notes · What I&apos;m learning
          </p>

          <h1 className="font-heading max-w-3xl text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.95] font-bold tracking-[-0.03em] text-(--color-text)">
            The 4 agentic engineering skills to know
          </h1>

          <p className="font-body mt-6 max-w-2xl text-[17px] leading-[1.7] text-(--color-muted)">
            My understanding of context, containment, loop, and graph
            engineering, and what I learned while using coding agents to
            recreate Super Mario Bros.
          </p>
        </section>
      </FadeIn>

      {/* Body */}
      <div className="bg-(--color-surface)">
        <FadeIn>
          <article className="mx-auto w-full max-w-4xl px-6 py-16 md:px-12 md:py-24 lg:px-0">
            <Prose>
              <P>
                I recently spent time looking at{" "}
                <A href="https://runcolony.com/">Colony</A>, a platform for
                coordinating coding agents. I was interested in how a system
                like this manages several agents working on the same project.
                Each agent needs information about the code, access to tools,
                and a way to check its changes. When their work is combined,
                someone also needs to determine whether the changes work
                together. These are engineering problems that remain even when
                the model can write the code for a feature.
              </P>

              <P>
                I have been reading about four terms for these problems: context
                engineering, containment engineering, loop engineering, and
                graph engineering. I am using them here to organize my
                understanding of coding agents. I believe the distinction is
                useful because a failed task can have several causes. An agent
                may misunderstand an interface, have access to something it
                should not modify, or finish without testing the behavior that
                was requested.
              </P>

              <P>
                I learned some of this while using agents to recreate Super
                Mario Bros. Asking an agent to rebuild the whole game left too
                much undefined. I had to give it a specific goal, such as making
                World 1 completable, so there was a result to test. I also found
                that how I divided the work mattered. An instruction that worked
                well for my 3D Three.js game tasks did not work as well when the
                game systems depended on each other.
              </P>

              <H2>Context engineering</H2>

              <P>
                Context engineering manages the information available to the
                model when it makes a decision. This includes the task
                description, source files, project instructions, and results
                from previous attempts. The article on{" "}
                <A href="https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html">
                  Martin Fowler&apos;s site
                </A>{" "}
                describes how this information can be selected and maintained
                for coding agents. For the Mario recreation, the agent needs to
                understand the current movement and collision code before
                changing a level. Whether a gap can be crossed depends on how
                far the player can jump. Looking at the level layout alone would
                miss that dependency.
              </P>

              <P>
                A repository can contain far more information than a task needs.
                Loading unrelated files takes up context and gives the model
                more material to sort through. I would keep general project
                conventions in AGENTS.md or CLAUDE.md, then have the agent read
                implementation details as they become relevant. For example, an
                agent fixing a jump needs the movement settings and the geometry
                of the obstacle where it fails. It may not need the code for the
                title screen.
              </P>

              <Diagram>{`Goal: World 1 is completable
    |
Project instructions
    |
Movement + collision code
    |
Level layout + progression rules
    |
Relevant test results
    |
Model makes the next change`}</Diagram>

              <P>
                Context also needs to survive a failed attempt. If a test shows
                that the player cannot get past an obstacle, the next attempt
                should include where it happened and what the player was doing.
                Otherwise, the agent may repeat the same mistake. This is
                similar to the retrieval work I did for the AI assistant at
                Elysium Health. The model needed the relevant supplement and
                safety documents to answer a question. Having documents
                available was only useful when the retrieval process supplied
                the ones needed for that question.
              </P>

              <H2>Containment engineering</H2>

              <P>
                Containment engineering limits the resources an agent can access
                and the actions it can perform. An instruction asking the agent
                to avoid production still leaves that decision to the model if
                production access is available. Permissions need to enforce the
                restriction. Anthropic&apos;s{" "}
                <A href="https://www.anthropic.com/engineering/how-we-contain-claude">
                  explanation of containment
                </A>{" "}
                discusses how isolation and access controls limit what an agent
                can affect.
              </P>

              <P>
                For the Mario recreation, I would give the agent a local
                development environment where it can edit the game and run it in
                a browser. It does not need production credentials or deployment
                access to test whether a level is playable. A feature worktree
                would keep its edits separate from other work. The worktree
                itself is not a security boundary; filesystem restrictions and
                repository permissions would still need to control access
                outside it.
              </P>

              <Diagram>{`Agent environment
    |
    +-- Files: access restricted to the task workspace
    +-- Network: permitted services only
    +-- Credentials: no production access
    +-- Repository: protected main branch
    +-- Deployment: no access`}</Diagram>

              <P>
                I believe this becomes more important when an agent is allowed
                to run for longer periods without supervision. A mistaken
                command should have a limited effect, even if the agent loses
                track of an earlier instruction. These controls still depend on
                correct configuration and the strength of the isolation. They
                reduce the possible damage, but they do not prove that every
                action inside the environment is safe. Retry limits and spending
                limits are also useful because a task can consume resources
                without making progress.
              </P>

              <H2>Loop engineering</H2>

              <P>
                Loop engineering defines the repeated process an agent uses to
                work toward a result. The agent makes a change, runs a check,
                reads the result, and decides what to do next. IBM&apos;s{" "}
                <A href="https://www.ibm.com/think/topics/loop-engineering">
                  overview of loop engineering
                </A>{" "}
                describes the role of feedback in this process. The checks need
                to correspond to the task. A successful typecheck tells me
                something about the code, but it does not tell me whether the
                player can finish World 1. The game can compile and display a
                level while still having an obstacle that makes completion
                impossible.
              </P>

              <Diagram>{`Goal: World 1 is completable
    |
Implement a small change
    |
Play through and check <------------+
    |                              |
Read failures and inspect behavior |
    |                              |
World 1 complete? -- no --> Fix -----+
    |
   yes
    |
Submit for review

Stop for help if the retry limit is reached.`}</Diagram>

              <P>
                When I was recreating Super Mario Bros., I learned that I had to
                give specific goals like &ldquo;World 1 is completable.&rdquo;
                Saying &ldquo;rebuild the whole game&rdquo; did not give the
                agent a clear point at which to stop and verify its work. A
                completable world is something I can check by playing through
                it. It also gives the agent a reason to fix a blocking problem
                before adding more of the game.
              </P>

              <P>
                For that goal, I would have the agent test the path through
                World 1 and record where progress stops. If a jump is
                impossible, it needs to inspect the movement behavior and level
                geometry, make a correction, and try that section again. After
                the fix, the full path still needs to be checked. Completing the
                world would not prove that the whole game is accurate, but it
                would establish that this particular goal was met. If repeated
                attempts fail, the agent should report what is blocking it and
                preserve the current work.
              </P>

              <P>
                This reminds me of the memory safety research from my systems
                programming coursework. A memory safety mechanism can stop
                execution when an invalid access occurs, which helps avoid
                silent corruption. A test in an agent loop can serve a similar
                purpose by catching a bad change before more work depends on it.
                The comparison has a limitation: tests only check the cases they
                cover. Passing them does not provide the formal guarantee
                described in a memory safety proof.
              </P>

              <H2>Graph engineering</H2>

              <P>
                Graph engineering describes a workflow through nodes and the
                connections between them. A node can represent a task or a
                review step, and a connection defines when the workflow can move
                to the next step. The{" "}
                <A href="https://github.com/context4ai/agent-graph/blob/main/docs/en/graph-engineering.md">
                  agent-graph documentation
                </A>{" "}
                uses this term for making the structure explicit. I find it
                useful when several agents have work that depends on each other.
              </P>

              <P>
                I have found that telling an agent to &ldquo;fan out
                aggressively with subagents&rdquo; works well for my 3D Three.js
                game tasks. It did not work as well for recreating Super Mario
                Bros., where the work needed to happen in a more dependent
                sequence. The movement behavior affects which jumps are
                possible, collision affects how the player interacts with the
                level, and progression depends on those systems working
                together. Separate agents working on these parts can make
                assumptions that do not agree.
              </P>

              <Diagram>{`Define what completing World 1 means
    |
Implement and check movement
    |
Check collisions with the level
    |
Build and test the path through World 1
    |
Verify progression through the world
    |
Play through from the beginning
    |
Blocked? -> Fix the relevant system -> Replay
    |
Completable -> Review`}</Diagram>

              <P>
                The workflow runner needs to enforce these conditions. Drawing a
                graph or writing the steps into a prompt does not prevent an
                agent from skipping a test. If the integration check fails, the
                runner should return the task for correction and keep merge
                unavailable. It should also retain the test results and the
                revision they belong to, so a result from an earlier version
                cannot be used to approve a later change.
              </P>

              <P>
                I believe the useful distinction is how much the tasks depend on
                each other. For a 3D scene, work such as separate visual objects
                can be a reasonable candidate for parallel agents if the
                interfaces are agreed on. For a recreation with specific
                gameplay behavior, I would establish movement and collision
                before asking other agents to build work around them. My
                experience with Three.js does not mean that every 3D task can be
                split freely. I need to look at the dependencies before choosing
                how many agents to use.
              </P>

              <H2>Applying this to my projects</H2>

              <P>
                These four terms help me identify where a coding task went
                wrong. If an agent builds a jump using the wrong movement
                assumptions, I would look at the context it received. If it
                modifies files outside the game, I would check its permissions.
                If it reports success without playing through World 1, I would
                change the verification loop. If separate agents build
                incompatible systems, I would reconsider how the work was
                divided and when those systems were tested together.
              </P>

              <P>
                The Mario recreation gave me a more specific way to direct an
                agent. I can ask for World 1 to be completable, inspect what
                prevents that, and use those failures to guide the next attempt.
                I also have a better reason to choose parallel work on a task by
                task basis. I would still use aggressive subagent work for the
                Three.js tasks where it has helped me, but for dependent
                gameplay systems I would first make sure the behavior that later
                work relies on is working.
              </P>

              <H2>References</H2>

              <UL>
                <li>
                  <A href="https://www.ibm.com/think/topics/loop-engineering">
                    IBM — What Is Loop Engineering?
                  </A>
                </li>
                <li>
                  <A href="https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html">
                    Martin Fowler — Context Engineering for Coding Agents
                  </A>
                </li>
                <li>
                  <A href="https://www.anthropic.com/engineering/how-we-contain-claude">
                    Anthropic — How we contain Claude across products
                  </A>
                </li>
                <li>
                  <A href="https://majid-mazouchi.github.io/autonomy/assets/posts/agentic-loop-engineering.html">
                    Majid Mazouchi — Loop Engineering for Agentic AI Coding
                  </A>
                </li>
                <li>
                  <A href="https://github.com/context4ai/agent-graph/blob/main/docs/en/graph-engineering.md">
                    context4ai/agent-graph — Graph Engineering
                  </A>
                </li>
                <li>
                  <A href="https://runcolony.com/">Colony — runcolony.com</A>
                </li>
              </UL>
            </Prose>
          </article>
        </FadeIn>
      </div>
    </main>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[720px]">{children}</div>;
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body mb-5 text-[16px] leading-[1.7] text-(--color-text)">
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading mt-16 mb-4 text-[24px] font-semibold text-(--color-text) md:text-[28px]">
      {children}
    </h2>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="font-body mb-5 ml-5 list-disc space-y-2 text-[16px] leading-[1.7] text-(--color-text)">
      {children}
    </ul>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-(--color-link) underline underline-offset-2 hover:no-underline"
    >
      {children}
    </a>
  );
}

function Diagram({ children }: { children: string }) {
  return (
    <div className="my-7 overflow-x-auto rounded-lg border border-(--color-border) bg-(--color-bg) p-5">
      <pre className="text-[12.5px] leading-[1.55] whitespace-pre text-(--color-text) md:text-[13px]">
        <code>{children}</code>
      </pre>
    </div>
  );
}
